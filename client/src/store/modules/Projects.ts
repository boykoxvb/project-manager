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

        availableGroupColors(state) {
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

        finishTask({commit}, {project, task}) {
            // Отправляем на сервер запрос с завершением этого таска 
            commit('setTaskState', { task: task, taskState: TaskState.FINISHED})
        },

        async taskModified({commit}, {task, name}) {
            // Отправляем запрос
            commit('modifyTask', {task, name})
        },

        async addNew({commit}, group?) {
            if (group) {
                commit('addProjectInGroup', {group})
                return
            }
            // Отправляем запрос на сервер для добавления нового проекта, в ответе должны получить новый uuid
            commit('addEmptyProject')
        },

        addTask({commit}, project: Project) {
            commit('addTask', project)
        },

        async projectChanged({commit}, buffer) {
            await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация сервера
            buffer.deadline ? commit('changeProjectDeadline', {project: buffer.project, deadline: buffer.deadline}) : ''
            buffer.name ? commit('changeProjectName', {project: buffer.project, name: buffer.name}) : ''
            buffer.groupName ? commit('changeProjectGroup', {project: buffer.project, groupName: buffer.groupName}) : ''

        },

        async delete({commit}, {project}) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            commit('deleteProject', {project})
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

        changeProjectGroup(state, {project, groupName}) {
            // Ищем группу по имени
            const targetGroup = state.groups.find((group: ProjectGroup) => group.name === groupName)
            if (!targetGroup) throw new Error(`Группы с названием ${groupName} не существует во Vuex. Изменение группы проекта невозможно.`)

            const oldGroup = project.group
            project.group = targetGroup
            targetGroup.projects.push(project)

            if (!oldGroup) return
            oldGroup.projects = oldGroup.projects.filter((pr: Project) => pr !== project)
            
        },

        changeProjectDeadline(_, {project, deadline}) {
            project.deadline = deadline
        },

        changeProjectName(_, {project, name}) {
            project.name = name
        },


        deleteProject(state, {project}) {

            state.projects = state.projects.filter((pr: Project) => pr !== project)

            // const group = state.groups.find((gr) => gr === project.group)
            // group.projects = group.projects.filter((pr: Project) => pr !== project)
        },

        addEmptyProject(state) {
            // Пушим новый проект в массив проектов, в группы не добавляем. 
            // Проектом эта сущность становится после первого сохранения

            if (!state.projects.find((proj) => proj.name == '' || proj.group == null /* || proj.uuid == '' */)) {
                const newProject = new Project('', '')
                state.projects.push(newProject)
                state.choosedProject = newProject
            }
        },

        addProjectInGroup(state, {group}) {
            const newProject = new Project('', '')
            console.log(group)
            group.addProject(newProject)
            state.projects.push(newProject)
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

        addTask(state, project: Project) {
            project.addTask(new Task('', ''))
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