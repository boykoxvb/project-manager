import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import Projects from './modules/Projects/Projects'
import Auth from './modules/Auth/Auth'
import { IRootState } from './interfaces'


import * as ProjectManager from '@/classes'

export const key: InjectionKey<Store<IRootState>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}

export const store = createStore({
  state: {
    userId: 'UUID of UserId',
    choosedProject: new ProjectManager.Project('uuid', 'По умолчанию'),
  },

  mutations: {
    chooseProject(state, project: ProjectManager.Project) {
      state.choosedProject = project
    }
  },

  modules: {
    Projects: Projects,
    Auth: Auth,
  }

})


