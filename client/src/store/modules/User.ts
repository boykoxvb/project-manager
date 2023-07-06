import * as ProjectManager from '@/classes'
import { Module } from 'vuex'
import { IRootState, IUserState } from '@/store/interfaces'
import cookie from 'js-cookie'
import AuthService from '@/services/auth-service'
import IUserDto from '@/classes/interfaces/IUserDto'
import { AxiosError } from 'axios'


const User: Module<IUserState, IRootState> = {
    namespaced: true,
    state() {
        return {
            id: '',
            email: '',
            is_activated: false,
        }
    },

    getters: {

        userId(state) {
            return state.id
        },

        accessToken() {
            return cookie.get('access_token')
        },

        refreshToken() {
            return cookie.get('refresh_token')
        },

        isAutorized(state): boolean {
            return Boolean(state.id && state.email)
        }
    },

    actions: {

        async login({commit}, {email, password}) {

            try {
                const res = await AuthService.login(email, password)
                commit('setTokens', {access_token: res.data.access_token, refresh_token: res.data.refresh_token})
                commit('setUser', {user: res.data.user})
                return { success: true, message: 'Авторизация пройдена'}
            }catch (e: any) {
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
      
        setTokens( _ , {access_token, refresh_token}) {
            cookie.set('access_token', access_token)
            cookie.set('refresh_token', refresh_token)
        }
    }
}

export default User