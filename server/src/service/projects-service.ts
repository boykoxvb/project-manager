import { Project, ProjectGroup, Task, User } from '../orm/entity/index'
import ProjectDto, { ProjectState } from '../dto/project-dto'
import AppDataSource from '../orm'
import ApiError from '../exceptions/api-error'
import userService from './user-service'
import ProjectGroupDto from '../dto/project-groups-dto'
import TaskDto, { TaskState } from '../dto/task-dto'

const projectsRep = AppDataSource.getRepository(Project)
const projectGroupsRep = AppDataSource.getRepository(ProjectGroup)
const tasksRep = AppDataSource.getRepository(Task)

class ProjectsService {
  // Группы
  async getProjectGroups(user_id: string) {
    const projectGroups = await projectGroupsRep.find({
      relations: { user: true },
      where: { user: { id: user_id } },
      order: {create_date: 'ASC'},
    })

    const projectGroupsDto: Array<ProjectGroupDto> = []
    const promise = projectGroups.map(async (gr) => {
      const projects = await projectsRep.find({
        relations: { project_group: true, user: true },
        where: {
          project_group: { id: gr.id },
          user: { id: user_id },
        },
        order: {create_date: 'ASC'},
      })
      const projectsDtoArray: Array<ProjectDto> = []
      await Promise.all(
        projects.map(async (pr) => {
          const tasksDtoArray = await tasksRep
            .find({
              relations: { project: true },
              where: {
                project: { id: pr.id },
              },
              order: {create_date: 'ASC'},
            })
            .then((t) => t.map((task) => new TaskDto(task)))
          projectsDtoArray.push(new ProjectDto(pr, tasksDtoArray))
        })
      )
      projectGroupsDto.push(new ProjectGroupDto(gr, projectsDtoArray))
    })
    await Promise.all(promise)
    return projectGroupsDto
  }

  async addGroup(user_id: string, { name, color }) {
    const user = await userService.getUserById(user_id)
    const newGroup = new ProjectGroup(name, user, color)
    await projectGroupsRep.save(newGroup)
    return newGroup
  }

  async changeGroup(user_id: string, group_id, { name, color }) {
    const group = await this.getGroup(group_id, user_id)
    if (name) group.name = name
    if (color) group.color = color
    return new ProjectGroupDto(await projectGroupsRep.save(group))
  }

  async deleteGroup(user_id: string, group_id: string) {
    // Ищем группу по Id и юзеру в целях безопасности
    const res = await projectGroupsRep.delete({ id: group_id, user: { id: user_id } })
    if (res.affected == 0) {
      throw ApiError.NotFound(`Группа проектов с id ${group_id} не найдена`)
    }
  }

  async getGroup(group_id: string, user_id: string) {
    const group = await projectGroupsRep.findOne({
      relations: { user: true },
      where: { id: group_id, user: { id: user_id } },
    })
    if (!group) throw ApiError.NotFound(`Группа проектов с id ${group_id} не найдена`)
    return group
  }

  // Проекты
  async addProject(user_id: string, projectDto: ProjectDto) {
    const { name, group_id, deadline } = projectDto
    const user = await userService.getUserById(user_id)
    const group = await projectGroupsRep.findOne({
      relations: { user: true },
      where: { id: group_id, user: { id: user.id } },
    })
    const newProject = new Project(name, user, group, ProjectState.STARTED, deadline)
    await projectsRep.save(newProject)
    return new ProjectDto(newProject)
  }

  async changeProject(user_id: string, projectDto: ProjectDto) {
    const { name, group_id, deadline } = projectDto
    const project = await this.getProject(user_id, projectDto.uuid)
    if (name) project.name = name
    if (group_id) project.project_group = await this.getGroup(group_id, user_id)
    if (deadline)
      project.deadline = new Date(deadline).toString() != new Date(0).toString() ? deadline : null
    return new ProjectDto(await projectsRep.save(project))
  }

  async getProject(user_id: string, project_id: string) {
    const project = await projectsRep.findOne({
      relations: { user: true },
      where: { id: project_id, user: { id: user_id } },
    })
    if (!project) throw ApiError.NotFound(`Проект с id ${project_id} не найден`)
    return project
  }

  async deleteProject(user_id: string, project_id: string) {
    const res = await projectsRep.delete({ id: project_id, user: { id: user_id } })
    if (res.affected == 0) {
      throw ApiError.NotFound(`Проект с id ${project_id} не найден`)
    }
  }

  // Tasks
  async addTask(user_id: string, projectDto: ProjectDto, taskDto: TaskDto) {
    const { name } = taskDto
    const project = await this.getProject(user_id, projectDto.uuid)
    const newTask = new Task(name, project)
    await tasksRep.save(newTask)
    return new TaskDto(newTask)
  }

  async getTaskById(task_id: string): Promise<Task> {
    return await tasksRep.findOne({ where: { id: task_id } })
  }

  async changeTask(taskDto: TaskDto) {
    const { name, uuid } = taskDto
    const task = await tasksRep.findOne({ where: { id: uuid } })
    task.name = name
    await tasksRep.save(task)
    return new TaskDto(task)
  }

  async finishTask(task_id: string) {
    const task = await this.getTaskById(task_id)
    task.state = TaskState.FINISHED
    const res = await tasksRep.save(task)
    return res
  }

  async fillNewUserWithDemo(user: User) {
    try {
      const demoGroup = await this.addGroup(user.id, {
        name: 'Демо группа',
        color: 'ocean',
      })
      const demoProject = new Project('Демо-проект', user, demoGroup, 7, undefined)
      const demoTasks = [
        new TaskDto(new Task('Поменять название демо-группы', demoProject)),
        new TaskDto(new Task('Поменять цвет демо-группы', demoProject)),
        new TaskDto(new Task('Поменять название демо-проекта', demoProject)),
        new TaskDto(new Task('Поменять дедлайн демо-проекта', demoProject)),
      ]
      const demoProjectDto = new ProjectDto(demoProject)
      await this.addProject(user.id, demoProjectDto)

      for (let t of demoTasks) {
        await this.addTask(user.id, demoProjectDto, t)
      }
      return true
    } catch (e) {
      console.error(`Не удалось добавить демо-данные для пользователя ${user.id}:
        ${e.message}`)
    }
  }
}

export default new ProjectsService()
