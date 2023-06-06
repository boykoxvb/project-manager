import * as ProjectManager from '@/classes'
import { Module } from 'vuex'
import { IRootState, IAuthState } from '@/store/interfaces'


const Projects: Module<IAuthState, IRootState> = {
    namespaced: true,
    state() {
        return {
            sessionId: '',
            userId: '',
            failAttempts: 0,
        }

    },

    getters: {

    },

    actions: {
        attemptAuth({commit}, {login, password}) {
            // Отправляем запрос на сервер, поулчаем ответ
            // Пока всегда отдаем пользователя и считаем аут успешным 
            // fetch бла бла бла
            //commit('resolveAuth', {sessionId: 'SessionId', userId: 'UserId'})
            commit('rejectAuth')
            return { code: 1, message: 'Неверный пользователь или пароль' }
        }
    },

    mutations: {
        resolveAuth(state, {sessionId, userId}) {
            state.sessionId = sessionId
            state.userId = userId
        },

        rejectAuth(state) {
            state.failAttempts += 1
        }
    }
}

export default Projects