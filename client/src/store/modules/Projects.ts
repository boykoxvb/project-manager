import { ProjectGroup, Project, Task, sortState, filterState, TaskState} from '@/classes'
import { ProjectGroupDto, ProjectDto, TaskDto } from '@/services/dto'
import { Module } from 'vuex'
import { IRootState, IProjectsState } from '@/store/interfaces'
import ProjectsService from '@/services/projects-service'


const Projects: Module<IProjectsState, IRootState> = {
    namespaced: true,
    state() {
        return {
            groups: [],
            projects: [],
            choosedProject: null,
            sortState: sortState,
            filterState: filterState,
        }
    },

    getters: {

        allGroups(state) {
            return state.groups
        },

        allProjects(state) {

            if (!state.sortState.getActive()) {
                return state.projects
            } else {
                if (state.sortState.name != null) {
                    return state.projects.slice().sort((a, b) => {
                        return a.name == b.name ? 0 : 
                            a.name > b.name ? (state.sortState.name ? 1 : -1) : (state.sortState.name ? -1 : 1)
                    })
                }else if (state.sortState.deadline != null) {
                    return state.projects.slice().sort((a, b) => {
                        if (a.deadline && b.deadline) {
                            return state.sortState.deadline ? 
                                a.deadline.getTime() - b.deadline.getTime() : 
                                b.deadline.getTime() - a.deadline.getTime()
                        }else if (!a.deadline) {
                            return state.sortState.deadline ? -1 : 1
                        }else if (!b.deadline) {
                            return state.sortState.deadline ? 1 : -1
                        }else{
                            return 0
                        }
                    })
                }
            }
        },

        filteredProjects(state, getters) {
            var filteredByName = []
            var filteredByGroup = []
            var filteredByState = []


            filteredByName = state.filterState.nameSearch 
                ? getters.allProjects.filter((project: Project) => project.name.includes(state.filterState.nameSearch))
                : getters.allProjects


            filteredByGroup = state.filterState.groupFilter 
                ? filteredByName.filter((project: Project) => project.group == state.filterState.groupFilter )
                : filteredByName


            filteredByState = state.filterState.stateFilter
                ? filteredByGroup.filter((project: Project) => project.state == state.filterState.stateFilter)
                : filteredByGroup
            
            return filteredByState
        },

        choosedProject(state) {
            return state.choosedProject
        },

        sortState(state) {
            return state.sortState
        },

        filterState(state) {
            return state.filterState
        },

        availableGroupColors() {
            return ['default','lime','orange','ocean','sky','pink','red']
        }

    },

    actions: {
        async fetchGroups({commit}) {
            //Получаем данные с сервера 
            // var Group1 = new ProjectGroup('uuid','Группа проектов №1', 'sky')
            // var Group2 = new ProjectGroup('uuid', 'Группа 2', 'lime')
            // var Group3 = new ProjectGroup('uuid', '3ая группа', 'default')

            // Group1.addProject(new Project('uuidu82384823492934', 'My Project 1', new Date(), new Date()))
            // Group1.addProject(new Project('uuidu13i41o25pp4o23', 'My Project 2', undefined, new Date()))
            // Group2.addProject(new Project('uuidi28592935020350', 'My Project 3', undefined, new Date()))
            // Group3.addProject(new Project('uuid238592305290350', 'My Project 4', undefined, new Date()))
            // Group3.addProject(new Project('uuid9238469240522i3', 'My Project 5', undefined, new Date()))

            // Group1.projects[0].addTask(new Task('uuid', 'Погулять с собакий'))
            // Group1.projects[0].addTask(new Task('uuid', 'Выпить пива'))
            // Group1.projects[0].addTask(new Task('uuid', 'Сделать дз'))
            // Group1.projects[1].addTask(new Task('uuid', 'Убрать стол'))

            // Group2.projects[0].addTask(new Task('uuid', 'Купить ручку'))
            // Group2.projects[0].addTask(new Task('uuid', 'Сделать дела'))

            // Group3.projects[0].addTask(new Task('uuid', 'Купить сок'))
            // Group3.projects[0].addTask(new Task('uuid', 'Оказался носок'))


            // var projectGroups = [Group1, Group2, Group3]

            // let Group1 = new ProjectGroup('uuid','Группа проектов №1', 'sky')
            // Group1.addProject(new Project('uuidu82384823492934', 'My Project 1', new Date()))
            // Group1.addProject(new Project('uuidu13i41o25pp4o23', 'My Project 2'))
            // Group1.projects[0].addTask(new Task('uuid', 'Погулять с собакий'))
            // Group1.projects[0].addTask(new Task('uuid', 'Выпить пива'))
            // Group1.projects[0].addTask(new Task('uuid', 'Сделать дз'))

            const groupsDto = (await ProjectsService.getAllGroups()).data
            const projectGroups = groupsDto.map((dto) => new ProjectGroup(undefined, undefined, undefined, dto))

            commit('setGroups', projectGroups)
            commit('setProjects', [].concat(...projectGroups.map((group: any) => group.projects)))
        },

        async addTask({commit}, project: Project) {

            //* Генерим временный uuid, чтобы не дожидаться ответа от сервера
            const uuid = Math.random().toString()
            commit('addTask', {project, uuid})
            const res = await ProjectsService.addTask(new TaskDto('', ''), ProjectDto.convertFromObject(project))
            const newUUID = res.data.uuid
            commit('setTaskUUID', {project, uuid, newUUID})
        },

        async taskModified({commit}, {task, name}) {
            const taskDto = TaskDto.convertFromObject(task)
            taskDto.name = name
            const res = await ProjectsService.changeTask(taskDto)
            commit('modifyTask', {task, name})
        },

        async finishTask({commit}, {project, task}) {
            // Отправляем на сервер запрос с завершением этого таска 
            const res = await ProjectsService.deleteTask(task.uuid)
            commit('setTaskState', { task: task, taskState: TaskState.FINISHED})
        },



        async addNew({commit}, group?: ProjectGroup) {

            if (group) {
                commit('addProjectInGroup', {group})
                return
            }
            // Отправляем запрос на сервер для добавления нового проекта, в ответе должны получить новый uuid
            commit('addEmptyProject')
        },

        async projectChanged({commit}, {project, changes}) {

            const projectDto = ProjectDto.convertFromObject(changes)
            const res = await ProjectsService.changeProject(projectDto)

            if (!changes.uuid) {
                commit('setEmptyProject', res.data.uuid)
            }

            changes.deadline ? commit('changeProjectDeadline', {project: project, deadline: changes.deadline}) : ''
            changes.name ? commit('changeProjectName', {project: project, name: changes.name}) : ''
            changes.group.uuid ? commit('changeProjectGroup', {project: project, group_id: changes.group.uuid}) : ''
        },

        async delete({commit}, {project}) {
            if (project.uuid == '') {
                commit('deleteProject', {project})
                return
            }
            commit('deleteProject', {project})
            await ProjectsService.deleteProject(project.uuid)
        },

        async editGroup({commit}, {group, changes}) {
            try {
                const res = await ProjectsService.changeProjectGroup(group.uuid, new ProjectGroupDto(changes))
                const {name, color} = res.data
                commit('editGroup', {group, name, color})
                return {success: true, message: `Группа проектов ${name} успешно изменена.`}
            }catch(e: any) {
                console.log(e)
                // if (e.response) {
                //     return { success: false, message: `Ошибка добавления группы проектов: ${e.response?.data.message}`}
                // } else {
                //     return { success: false, message: `Ошибка авторизации: ${e.message}`}
                // }
            }
        },

        async addGroup({commit}, {name, color}) {
            // Делаем запрос на сервер на добавление группы проектов
            try {
                const res = await ProjectsService.addProjectGroup({uuid: undefined, name: name, color: color, projects: []})
                const uuid = res.data
                commit('addGroup', { uuid, name, color })
                return {success: true, message: `Группа проектов ${name} успешно добавлена.`}
            }catch(e: any) {
                console.log(e)
            }
        },

        async deleteGroup({commit}, group: ProjectGroup) {
            // Делаем запрос на сервер на добавление группы проектов
            try {
                const res = await ProjectsService.deleteProjectGroup(group.uuid)
                commit('deleteGroup', group)
                return {success: true, message: `Группа проектов ${group.name} успешно удалена.`}
            }catch(e: any) {
                console.log(e)
                // if (e.response) {
                //     return { success: false, message: `Ошибка добавления группы проектов: ${e.response?.data.message}`}
                // } else {
                //     return { success: false, message: `Ошибка авторизации: ${e.message}`}
                // }
            }
        }
        
    },

    mutations: {
        setGroups(state, groups): void {
            state.groups = groups
        },

        editGroup(state, {group, name, color}) {
            const targetGroup = state.groups.find((gr) => {return gr == group})
            if (!targetGroup) {
                console.error('Vuex: Группа проектов для изменения не найдена')
                return
            }
            if (name) {
                targetGroup.name = name
            }
            if (color) {
                targetGroup.color = color
            }
        },

        addGroup(state, {uuid, name, color}) {
            state.groups.push(new ProjectGroup(uuid, name, color))
        },

        deleteGroup(state, group) {
            state.groups = state.groups.filter((gr) => gr !== group)
            state.projects = state.projects.filter((pr) => pr.group !== group)
        },

        setProjects(state, projects): void {
            state.projects = projects
        },

        setTaskState(_, { task, taskState }) {
            task.setState(taskState)
        },

        modifyTask(_, {task, name}) {
            task.name = name
        },

        changeProjectGroup(state, {project, group_id}) {
            // Ищем группу по имени
            console.log(project, group_id)
            const targetGroup = state.groups.find((group: ProjectGroup) => group.uuid === group_id)
            if (!targetGroup) throw new Error(`Группы с Id ${group_id} не существует во Vuex. Изменение группы проекта невозможно.`)
            const oldGroup = project.group
            project.group = targetGroup
            targetGroup.projects.push(project)
            if (!oldGroup) return
            oldGroup.projects = oldGroup.projects.filter((pr: Project) => pr !== project)
            
        },

        changeProjectDeadline(_, {project, deadline}) {
            project.deadline = deadline.toString() !== new Date(0).toString() ? deadline : null
        },

        changeProjectName(_, {project, name}) {
            project.name = name
        },


        deleteProject(state, {project}) {
            state.projects = state.projects.filter((pr: Project) => pr !== project)
        },

        addEmptyProject(state) {
            // Пушим новый проект в массив проектов, в группы не добавляем. 
            // Проектом эта сущность становится после первого сохранения

            if (!state.projects.find((proj) => proj.name == '' || proj.group == null)) {
                const newProject = new Project()
                state.projects.push(newProject)
                state.choosedProject = newProject
            }
        },

        setEmptyProject(state, uuid) {
            const target = state.projects.find((pr) => pr.uuid == '')
            if (target) {
                target.uuid = uuid
            }else{
                throw 'Пустого проекта не существует'
            }
        },

        addProjectInGroup(state, {group}) {
            const newProject = new Project('', '')
            console.log(group)
            group.addProject(newProject)
            state.projects.push(newProject)
            state.choosedProject = newProject
            return
        },

        chooseProject(state, project: Project) {
            state.choosedProject = project
        },

        closeProject(state) {
            state.choosedProject = null
        },

        setSortState(state, {sort, asc}) {
            state.sortState.set(sort, asc)
        },

        addTask(_, {project, uuid}) {
            project.addTask(new Task(uuid, ''))
        },

        setTaskUUID(_, {project, uuid, newUUID}) {
            const task = project.tasks.find((t: Task) => t.uuid === uuid)
            task.uuid = newUUID
        },

        setFilterState(state, {name, group, states}) {
            if (name != null) {
                state.filterState.nameSearch = name
            }
            if (group) {
                state.filterState.groupFilter = group
            }
            if (states) {
                state.filterState.stateFilter = states
            }
        },

        unsetGroupFilter(state) {
            state.filterState.groupFilter = null
        },

        unsetStateFilter(state) {
            state.filterState.stateFilter = null
        }
    }
}

export default Projects