import userService from "../service/user-service"
import { validationResult } from "express-validator/src/validation-result"
import ApiError from "../exceptions/api-error"
import projectsService from "../service/projects-service"

class ProjectsController {

    // Группы
    async allGroups(req, res, next) {
        try {
            const user_id = req.userData.id
            const groups = await projectsService.getProjectGroups(user_id)
            console.log(groups)
            return res.send(groups)
        } catch (e) {
            next(e)
        }
    }

    async addGroup(req, res, next) {
        try {
            const user_id = req.userData.id
            const { name, color } = req.body
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
            const { name, color } = req.body
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
    async addProject(req, res, next) {
        try {
            // const user_id = req.userData.id
            // const { name, color } = req.body
            // // const newGroup = await projectsService.addProject()
            // // return res.send(newGroup.id) 
        } catch (e) {
            next(e)
        }
    }
    
    async changeProject(req, res, next) {
        try {
            const user_id = req.userData.id

        } catch (e) {

        }
    }

    async deleteProject(req, res, next) {
        try {
            const user_id = req.userData.id

        } catch (e) {

        }
    }



    // async registration(req, res, next) {
    //     try {
    //         const errors = validationResult(req)
    //         if (!errors.isEmpty()) {
    //             return next(ApiError.BadRequrest('Ошибка при валидации', errors.array()))
    //         }
    //         const {login, name, email, password} = req.body
    //         const userData = await userService.registration(login, name, email, password)
    //         res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    //         return res.send(userData)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    // async login(req, res, next) {
    //     try {
    //         const {email, password} = req.body
    //         const userData = await userService.login(email, password)
    //         res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    //         return res.send(userData)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    // async logout(req, res, next) {
    //     try {
    //         const {refresh_token} = req.cookies
    //         const token = await userService.logout(refresh_token)
    //         res.clearCookie('refresh_token')
    //         return res.json(token)
    //     } catch (e) {
    //         next(e)
    //     }
    // }


    // async refresh(req, res, next) {
    //     try {
    //         const {refresh_token} = req.cookies
    //         const userData = await userService.refresh(refresh_token)
    //         res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    //         return res.send(userData)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

}

export default new ProjectsController()