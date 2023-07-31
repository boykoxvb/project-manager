import userService from "../service/user-service"
import { validationResult } from "express-validator/src/validation-result"
import ApiError from "../exceptions/api-error"
import projectsService from "../service/projects-service"
import ProjectGroupDto from "../dto/project-groups-dto"

class ProjectsController {

    // Группы
    async allGroups(req, res, next) {
        try {
            const user_id = req.userData.id
            const groups = await projectsService.getProjectGroups(user_id)
            return res.send(groups)
        } catch (e) {
            next(e)
        }
    }

    async addGroup(req, res, next) {
        try {
            const user_id = req.userData.id
            const { name, color } = req.body.projectGroup
            const newGroup = await projectsService.addGroup(user_id, { name, color })
            return res.send(newGroup.id)
        } catch (e) {
            next(e)
        }
    }

    async changeGroup(req, res, next) {
        try {
            const user_id = req.userData.id
            const group_id = req.params.id 
            const { name, color } = req.body.changes
            const updatedGroup = await projectsService.changeGroup(user_id, group_id, {name, color})
            return res.send(updatedGroup)
        } catch (e) {
            next(e)
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const user_id = req.userData.id
            const group_id = req.params.id 
            await projectsService.deleteGroup(user_id, group_id)
            return res.send({success: true})
        } catch (e) {
            next(e)
        }
    }


    // Projects
    // async addProject(req, res, next) {
    //     try {
    //         const user_id = req.userData.id
    //         const { name, group_id, deadline } = req.body
    //         const newProject = await projectsService.addProject(user_id, {name, group_id, deadline})
    //         return res.send(newProject.id)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
    
    async changeProject(req, res, next) {
        try {
            const user_id = req.userData.id
            const { projectDto } = req.body
            if (projectDto.uuid) {
                return res.send(await projectsService.changeProject(user_id, projectDto))
            } else {
                return res.send(await projectsService.addProject(user_id, projectDto))
            }
        } catch (e) {
            next(e)
        }
    }

    async deleteProject(req, res, next) {
        try {
            const user_id = req.userData.id
            const { project_id } = req.body

            await projectsService.deleteProject(user_id, project_id)
            return res.send({success: true})

        } catch (e) {
            next(e)
        }
    }


    // Tasks

    async addTask(req, res, next) {
        try {
            const user_id = req.userData.id
            const { taskDto, projectDto } = req.body
            return res.send(await projectsService.addTask(user_id, projectDto, taskDto))
        } catch (e) {
            next(e)
        }
    } 

    async changeTask(req, res, next) {
        try {
            // const user_id = req.userData.id
            const { taskDto } = req.body
            return res.send(await projectsService.changeTask(taskDto))
        } catch (e) {
            next(e)
        }
    } 

    async finishTask(req, res, next) {
        try {
            // const user_id = req.userData.id
            const { task_id } = req.body
            console.log(req.body)
            const task = await projectsService.finishTask(task_id)
            console.log(task)
            return res.send(task)

        } catch (e) {
            next(e)
        }
    }

}

export default new ProjectsController()