import * as ProjectManager from '@/classes'
import { Module } from 'vuex'
import { IRootState, IAuthState } from '@/store/interfaces'
import AuthService from '@/services/auth-service'

const Projects: Module<IAuthState, IRootState> = {
  namespaced: true,
  state() {
    return {
      sessionId: '',
      userId: '',
      failAttempts: 0,
    }
  },

  getters: {},

  actions: {
    async login({ commit }, { email, password }) {
      await AuthService.login(email, password).then((response) => {})
    },
  },

  mutations: {
    setTokens() {},
  },
}

export default Projects
