import $api from './axios'
import {AxiosResponse} from 'axios'
import IAuthResponse from '@/classes/interfaces/IAuthResponse'

export default class AuthService {

    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post('/login', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    static async refresh(): Promise<void> {
        return $api.get('/refresh')
    }
}
