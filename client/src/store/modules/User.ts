import * as ProjectManager from '@/classes'
import { Module } from 'vuex'
import { IRootState, IUserState } from '@/store/interfaces'
import AuthService from '@/services/auth-service'


const User: Module<IUserState, IRootState> = {
    namespaced: true,
    state() {
        return {
            id: '',
            email: '',
            is_activated: false,
            access_token: '',
        }
    },

    getters: {

        userId(state) {
            return state.id
        },

        email(state) {
            return state.email
        },

        accessToken(state) {
            return state.access_token
        },
    },

    actions: {

        async login({commit}, {email, password}) {

            try {
                const res = await AuthService.login(email, password)
                commit('setAccessToken', res.data.access_token)
                commit('setUser', {user: res.data.user})
                return { success: true, message: 'Авторизация пройдена'}
            } catch (e: any) {
                commit('setUser', {})
                console.error(e)
                if (e.response) {
                    return { success: false, message: `Ошибка авторизации: ${e.response?.data.message}`}
                } else {
                    return { success: false, message: `Ошибка авторизации: ${e.message}`}
                }
            }
        },

        async registrate({commit}, {name, login, email, password}) {

            try {
                const res = await AuthService.registrate(name, login, email, password)
                return { success: true, message: 'Регистрация пройдена'}
            } catch (e: any) {
                console.error(e)
                if (e.response) {
                    return { success: false, message: `Ошибка регистрации: ${e.response?.data.message}`}
                } else {
                    return { success: false, message: `Ошибка регистрации: ${e.message}`}
                }
            }
        },

        async checkAuth({commit}) {
            try {
                const res = await AuthService.refresh()
                commit('setAccessToken', res.data.access_token)
                return { success: true, message: 'Пользователь авторизован'} 
            } catch (e: any) {
                console.error(e)
                return { success: false, message: 'Пользователь не авторизован'} 
            }
        }
    },

    mutations: {

        setUser(state, {user}) {
            if (user) {
                state.id = user.id
                state.email = user.email
                state.is_activated = user.is_activated
            } else {
                state.id = null
                state.email = null
                state.is_activated = null
            }

        },
      
        setAccessToken( state , access_token) {
            state.access_token = access_token
        }
    }
}

export default User