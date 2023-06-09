import * as ProjectManager from '@/classes'
import { Module } from 'vuex'
import { IRootState, IProjectsState } from '@/store/interfaces'


const Projects: Module<IProjectsState, IRootState> = {
    namespaced: true,
    state() {
        return {
            groups: [],
            projects: [],
            choosedProject: null,
        }
    },

    getters: {

        allGroups(state) {
            return state.groups
        },

        allProjects(state) {
            return state.projects
        },

        choosedProject(state) {
            return state.choosedProject
        },

    },

    actions: {
        fetchGroups({commit}) {
            //Получаем данные с сервера 
            var Group1 = new ProjectManager.ProjectGroup('uuid','Группа проектов №1', 'sky')
            var Group2 = new ProjectManager.ProjectGroup('uuid', 'Группа 2', 'lime')
            var Group3 = new ProjectManager.ProjectGroup('uuid', '3ая группа', 'default')

            Group1.addProject(new ProjectManager.Project('uuidu82384823492934', 'My Project 1', new Date(), new Date()))
            Group1.addProject(new ProjectManager.Project('uuidu13i41o25pp4o23', 'My Project 2', undefined, new Date()))
            Group2.addProject(new ProjectManager.Project('uuidi28592935020350', 'My Project 3', undefined, new Date()))
            Group3.addProject(new ProjectManager.Project('uuid238592305290350', 'My Project 4', undefined, new Date()))
            Group3.addProject(new ProjectManager.Project('uuid9238469240522i3', 'My Project 5', undefined, new Date()))

            Group1.projects[0].addTask(new ProjectManager.Task('uuid', 'Погулять с собакий'))
            Group1.projects[0].addTask(new ProjectManager.Task('uuid', 'Выпить пива'))
            Group1.projects[0].addTask(new ProjectManager.Task('uuid', 'Сделать дз'))
            Group1.projects[1].addTask(new ProjectManager.Task('uuid', 'Убрать стол'))

            Group2.projects[0].addTask(new ProjectManager.Task('uuid', 'Купить ручку'))
            Group2.projects[0].addTask(new ProjectManager.Task('uuid', 'Сделать дела'))

            Group3.projects[0].addTask(new ProjectManager.Task('uuid', 'Купить сок'))
            Group3.projects[0].addTask(new ProjectManager.Task('uuid', 'Оказался носок'))


            var projectGroups = [Group1, Group2, Group3]

            commit('setGroups', projectGroups)
            commit('setProjects', [].concat(...projectGroups.map((group: any) => group.projects)))
        },

        finishTask({commit}, {project, task}) {
            // Отправляем на сервер запрос с завершением этого таска 
            commit('setTaskState', { task: task, taskState: ProjectManager.TaskState.FINISHED})
        },

        addNew({commit}) {
            // Отправляем запрос на сервер для добавления нового проекта, в ответе должны получить новый uuid
            commit('addEmptyProject')
        },

        async projectChanged({commit}, buffer) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            buffer.deadline ? commit('changeProjectDeadline', {project: buffer.project, deadline: buffer.deadline}) : ''
            buffer.name ? commit('changeProjectName', {project: buffer.project, name: buffer.name}) : ''
            buffer.groupName ? commit('changeProjectGroup', {project: buffer.project, groupName: buffer.groupName}) : ''

        },

        async delete({commit}, {project}) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            commit('deleteProject', {project})
        },
        
    },

    mutations: {
        setGroups(state, groups): void {
            state.groups = groups
        },

        setProjects(state, projects): void {
            state.projects = projects
        },

        setTaskState(state, { task, taskState }) {
            task.setState(taskState)
            console.log(state.groups)
        },

        changeProjectGroup(state, {project, groupName}) {
            // Ищем группу по имени
            const targetGroup = state.groups.find((group: ProjectManager.ProjectGroup) => group.name === groupName)
            if (!targetGroup) throw new Error(`Группы с названием ${groupName} не существует во Vuex. Изменение группы проекта невозможно.`)

            const oldGroup = project.group
            project.group = targetGroup
            targetGroup.projects.push(project)

            if (!oldGroup) return
            oldGroup.projects = oldGroup.projects.filter((pr: ProjectManager.Project) => pr !== project)
            
        },

        changeProjectDeadline(state, {project, deadline}) {
            project.deadline = deadline
        },

        changeProjectName(state, {project, name}) {
            project.name = name
        },


        deleteProject(state, {project}) {

            state.projects = state.projects.filter((pr: ProjectManager.Project) => pr !== project)

            // const group = state.groups.find((gr) => gr === project.group)
            // group.projects = group.projects.filter((pr: ProjectManager.Project) => pr !== project)
        },

        addEmptyProject(state) {
            // Пушим новый проект в массив проектов, в группы не добавляем. 
            // Проектом эта сущность становится после первого сохранения
            if (!state.projects.find((proj) => proj.name == '' || proj.group == null /* || proj.uuid == '' */)) {
                const newProject = new ProjectManager.Project('', '')
                state.projects.push(newProject)
                state.choosedProject = newProject
            }
            
        },

        chooseProject(state, project: ProjectManager.Project) {
            state.choosedProject = project
        },
    }
}

export default Projects