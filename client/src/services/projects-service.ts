import $api from './axios'
import {Axios, AxiosResponse} from 'axios'
import IAuthResponse from '@/classes/interfaces/IAuthResponse'
import ProjectGroupDto from './dto/project-group-dto'

const PROJ_PATH = '/projects'

export default class ProjectsService {

    static async getAllGroups(): Promise<AxiosResponse<Array<ProjectGroupDto>>> {
        return $api.get(`${PROJ_PATH}/groups/all`)
    }

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
