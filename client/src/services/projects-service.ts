import $api from './axios'
import {Axios, AxiosResponse} from 'axios'
import IAuthResponse from '@/classes/interfaces/IAuthResponse'
import ProjectGroupDto from './dto/project-group-dto'
import ResultDto from './dto/result-dto'
import { ProjectDto, TaskDto } from './dto'

const PROJ_PATH = '/projects'

export default class ProjectsService {

    // Groups
    static async getAllGroups(): Promise<AxiosResponse<Array<ProjectGroupDto>>> {
        return $api.get(`${PROJ_PATH}/groups/all`)
    }

    static async addProjectGroup(projectGroup: ProjectGroupDto): Promise<AxiosResponse<string>> {
        return $api.post(`${PROJ_PATH}/groups`, {projectGroup})
    }

    static async changeProjectGroup(group_id: string, changes: ProjectGroupDto): Promise<AxiosResponse<ProjectGroupDto>> {
        return $api.put(`${PROJ_PATH}/groups/${group_id}`, {changes})
    }

    static async deleteProjectGroup(group_id: string): Promise<AxiosResponse<ResultDto>> {
        return $api.delete(`${PROJ_PATH}/groups/${group_id}`)
    }


    // Projects
    static async changeProject(projectDto: ProjectDto): Promise<AxiosResponse<ProjectDto>> {
        return $api.put(`${PROJ_PATH}/`, {projectDto})
    }

    static async deleteProject(project_id: string): Promise<AxiosResponse<ResultDto>> {
        return $api.delete(`${PROJ_PATH}/`, {data: { project_id }})
    }

    // Tasks

    static async addTask(taskDto: TaskDto, projectDto: ProjectDto): Promise<AxiosResponse<TaskDto>> {
        return $api.post(`${PROJ_PATH}/tasks`, {taskDto, projectDto})
    }

    static async changeTask(taskDto: TaskDto): Promise<AxiosResponse<TaskDto>> {
        return $api.put(`${PROJ_PATH}/tasks`, {taskDto})
    }

    static async finishTask(task_id: string): Promise<AxiosResponse<TaskDto>> {
        return $api.put(`${PROJ_PATH}/tasks/finish`, { task_id })
    }



    // static async registrate(name: string, login: string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    //     return $api.post(`${PROJ_PATH}/registration`, {name, login, email, password})
    // }

    // static async logout(): Promise<void> {
    //     return $api.post(`${PROJ_PATH}/logout`)
    // }
    
}
