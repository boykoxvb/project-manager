import $api, { BASE_URL } from './axios'
import axios, { AxiosResponse } from 'axios'
import IAuthResponse from '@/classes/interfaces/IAuthResponse'

const AUTH_PATH = '/auth'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post(`${AUTH_PATH}/login`, { email, password })
  }

  static async registrate(
    name: string,
    login: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post(`${AUTH_PATH}/registration`, { name, login, email, password })
  }

  static async logout(): Promise<void> {
    return $api.post(`${AUTH_PATH}/logout`)
  }

  static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
    return axios.get(`${BASE_URL}/auth/refresh`, { withCredentials: true })
  }
}
