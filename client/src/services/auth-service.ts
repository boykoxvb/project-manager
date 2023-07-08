import $api, { BASE_URL } from './axios'
import axios, {AxiosResponse} from 'axios'
import IAuthResponse from '@/classes/interfaces/IAuthResponse'

export default class AuthService {

    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post('/login', {email, password})
    }

    static async registrate(name: string, login: string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post('/registration', {name, login, email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
        return axios.get(`${BASE_URL}/refresh`, { withCredentials: true })
    }
}
