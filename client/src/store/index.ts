import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import Projects from './modules/Projects'
import Auth from './modules/Auth'
import User from './modules/User'

import { IRootState } from './interfaces'


export const key: InjectionKey<Store<IRootState>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}

export const store = createStore({
  state: {
    userId: 'UUID of UserId',
  },

  mutations: {
    
  },

  modules: {
    Projects: Projects,
    Auth: Auth,
    User,
  }

})


