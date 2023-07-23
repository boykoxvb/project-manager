import { Project, ProjectGroup, Task, User } from '../orm/entity/index'
import ProjectDto, { ProjectState } from '../dto/project-dto'
import AppDataSource from '../orm'
import { v4 } from 'uuid'
import ApiError from '../exceptions/api-error'
import userService from './user-service'
import { group } from 'console'
import ProjectGroupDto from '../dto/project-groups-dto'
import TaskDto from '../dto/task-dto'

const projectsRep = AppDataSource.getRepository(Project)
const projectGroupsRep = AppDataSource.getRepository(ProjectGroup)
const tasksRep = AppDataSource.getRepository(Task)


class ProjectsService {

    // Группы
    async getProjectGroups(user_id: string) {
        const projectGroups = await projectGroupsRep.find({
                relations: { user: true }, 
                where: {user: {id: user_id}}
            })

        const projectGroupsDto: Array<ProjectGroupDto> = []
        const promise = projectGroups.map(async (gr) => {
                const projects = await projectsRep.find({
                    relations: {project_group: true, user: true},
                    where: {
                        project_group: {id: gr.id},
                        user: {id: user_id}
                    }
                })
                const projectsDtoArray: Array<ProjectDto> = []
                await Promise.all(projects.map(async (pr) => {
                    const tasksDtoArray = await tasksRep.find({
                        relations: {project: true},
                        where: {
                            project: {id: pr.id}
                        }
                    }).then((t) => t.map((task) => new TaskDto(task)))
                    projectsDtoArray.push(new ProjectDto(pr, tasksDtoArray))
                }))
                projectGroupsDto.push(new ProjectGroupDto(gr, projectsDtoArray))
            })
            await Promise.all(promise)
        return projectGroupsDto
    }

    async addGroup(user_id: string, {name, color}) {
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
        const res = await projectGroupsRep.delete({id: group_id, user: {id: user_id}})
        if (res.affected == 0) {
            throw ApiError.NotFound(`Группа проектов с id ${group_id} не найдена`)
        }
    }

    async getGroup(group_id: string, user_id: string) {
        const group = await projectGroupsRep.findOne({ relations: {user: true}, where: {id: group_id, user: {id: user_id}}})
        if (!group) throw ApiError.NotFound(`Группа проектов с id ${group_id} не найдена`)
        return group
    }


    // Проекты
    async addProject(user_id: string, projectDto: ProjectDto) {
        const { name, group_id, deadline } = projectDto
        const user = await userService.getUserById(user_id) 
        const group = await projectGroupsRep.findOne({ relations: {user: true}, where: {id: group_id, user: {id: user.id}}})
        const newProject = new Project(name, user, group, ProjectState.STARTED, deadline)
        await projectsRep.save(newProject)
        return newProject
    }

    async changeProject(user_id: string, projectDto: ProjectDto) {
        const { name, group_id, deadline } = projectDto
        const project = await this.getProject(user_id, projectDto.uuid)
        if (name) project.name = name
        if (group_id) project.project_group = await this.getGroup(group_id, user_id)
        if (deadline) project.deadline = deadline == new Date(0) ? deadline : null
        return await projectsRep.save(project)
    }

    async getProject(user_id: string, project_id: string,) {
        const project = await projectsRep.findOne({ relations: {user: true}, where: {id: project_id, user: {id: user_id}}})
        if (!project) throw ApiError.NotFound(`Проект с id ${project_id} не найден`)
        return project
    } 

    // async addProject(user_id: string, {name, group_id, deadline}) {
    //     const user = await userService.getUserById(user_id) 
    //     const group = await projectGroupsRep.findOne({ relations: {user: true}, where: {id: group_id, user: {id: user.id}}})
    //     const newProject = new Project(name, user, group, deadline, ProjectState.STARTED)
    //     await projectsRep.save(newProject)
    //     return newProject
    // }

    // async registration(
    //     login: string, 
    //     name: string, 
    //     email: string, 
    //     password: string
    //     ): Promise<IUserData> {
    //     const loginCandidate = await userRep.findOne({where: {login: login}})
    //     if (loginCandidate) throw ApiError.BadRequrest(`Пользователь с логином ${login} уже существует`)
    //     const emailCandidate = await userRep.findOne({where: {email: email}})
    //     if (emailCandidate) throw ApiError.BadRequrest(`Пользователь с email ${email} уже существует`)
    //     const hashPassword = await bcrypt.hash(password, 3)
    //     const activation_link = v4()
    //     let user = new User(name, login, hashPassword, email, activation_link)
    //     user = await userRep.save(user)

    //     const userDto = new UserDto(user)
    //     const tokens = tokenService.generateTokens({...userDto})
    //     await tokenService.saveToken(user, tokens.refresh_token)

    //     // await userRep.delete({id: user.id})

    //     await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activation_link}`)

    //     return {
    //         ...tokens,
    //         user: userDto
    //     }
    // }

    // async activate(activation_link: string): Promise<void> {
    //     const user = await userRep.findOne({where: {activation_link: activation_link}})
    //     if (!user) throw ApiError.BadRequrest('Нерабочая ссылка активации')
    //     user.is_activated = true
    //     await userRep.save(user)
    // }

    // async login(email: string, password: string): Promise<IUserData> {
    //     const user = await userRep.findOne({where: {email: email}})
    //     if (!user) throw ApiError.BadUser(`Пользователь с email ${email} не был найден`)
    //     const isPassEquals = await bcrypt.compare(password, user.password)
    //     if (!isPassEquals) throw ApiError.BadRequrest(`Неверный пароль`)

    //     const userDto = new UserDto(user)
        
    //     const tokens = tokenService.generateTokens({...userDto})
    //     await tokenService.saveToken(user, tokens.refresh_token)
    //     return {
    //         ...tokens,
    //         user: userDto
    //     }
    // }

    // async logout(refresh_token: string) {
    //     const token = await tokenService.removeToken(refresh_token)
    //     return token
    // }

    // async refresh(refresh_token: string): Promise<IUserData> {
    //     const userData = tokenService.validateRefreshToken(refresh_token)
    //     const tokenFromDB = await tokenService.findRefreshToken(refresh_token)
    //     if (!userData || !tokenFromDB) {
    //         throw ApiError.UnauthorizedError()
    //     }

    //     const user = await userRep.findOne({where: {id: userData.id}})
    //     const userDto = new UserDto(user)
    //     const tokens = tokenService.generateTokens({...userDto})
    //     await tokenService.saveToken(user, tokens.refresh_token)
    //     return {
    //         ...tokens,
    //         user: userDto
    //     }
    // }

}

export default new ProjectsService()