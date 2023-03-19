import * as ProjectManager from '@/classes'
import { Module } from 'vuex'
import { IRootState, IProjectsState } from '@/store/interfaces'


const Projects: Module<IProjectsState, IRootState> = {
    namespaced: true,
    state() {
        return {
            groups: [],
        }
    },

    getters: {

        allGroups(state) {
            return state.groups
        },

        allProjects(state) {
            var allProjects: Array<ProjectManager.Project> = []
            state.groups.forEach((group) => {
                allProjects = allProjects.concat(group.projects)
            })
            return allProjects
        },

    },

    actions: {
        fetchGroups({commit}) {
            //Получаем данные с сервера 
            var Group1 = new ProjectManager.ProjectGroup('uuid','Группа проектов №1', 'sky')
            var Group2 = new ProjectManager.ProjectGroup('uuid', 'Группа 2', 'lime')
            var Group3 = new ProjectManager.ProjectGroup('uuid', '3ая группа', 'default')

            Group1.addProject(new ProjectManager.Project('uuid', 'My Project 1', undefined, new Date()))
            Group1.addProject(new ProjectManager.Project('uuid2', 'My Project 2', undefined, new Date()))
            Group2.addProject(new ProjectManager.Project('uuid2', 'My Project 3', undefined, new Date()))
            Group3.addProject(new ProjectManager.Project('uuid2', 'My Project 4', undefined, new Date()))
            Group3.addProject(new ProjectManager.Project('uuid2', 'My Project 5', undefined, new Date()))

            Group1.projects[0].addTask(new ProjectManager.Task('uuid', 'Погулять с собакий'))
            Group1.projects[0].addTask(new ProjectManager.Task('uuid', 'Выпить пива'))
            Group1.projects[0].addTask(new ProjectManager.Task('uuid', 'Сделать дз'))
            Group1.projects[1].addTask(new ProjectManager.Task('uuid', 'Убрать стол'))

            Group2.projects[0].addTask(new ProjectManager.Task('uuid', 'Купить ручку'))
            Group2.projects[0].addTask(new ProjectManager.Task('uuid', 'Отъебать сучку'))

            Group3.projects[0].addTask(new ProjectManager.Task('uuid', 'Купить сок'))
            Group3.projects[0].addTask(new ProjectManager.Task('uuid', 'Оказался носок'))


            var projectGroups = [Group1, Group2, Group3]

            commit('setGroups', projectGroups)
        },

        finishTask({commit}, {project, task}) {
            // Отправляем на сервер запрос с завершением этого таска 
            commit('setTaskState', { task: task, taskState: ProjectManager.TaskState.FINISHED})
        }

        
    },

    mutations: {
        setGroups(state, groups): void {
            state.groups = groups
        },

        setTaskState(state, { task, taskState }) {
            task.setState(taskState)
            console.log(state.groups)
        }
    }
}

export default Projects