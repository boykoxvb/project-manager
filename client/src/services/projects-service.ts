import $api from './axios'
import {AxiosResponse} from 'axios'
import IAuthResponse from '@/classes/interfaces/IAuthResponse'

const PROJ_PATH = '/projects'

export default class ProjectsService {

    static async addProjectGroup(): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post(`${PROJ_PATH}/groups`, {})
    }



    // static async registrate(name: string, login: string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    //     return $api.post(`${PROJ_PATH}/registration`, {name, login, email, password})
    // }

    // static async logout(): Promise<void> {
    //     return $api.post(`${PROJ_PATH}/logout`)
    // }
    
}
