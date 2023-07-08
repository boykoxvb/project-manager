import userService from "../service/user-service"
import { validationResult } from "express-validator/src/validation-result"
import ApiError from "../exceptions/api-error"

class UserController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequrest('Ошибка при валидации', errors.array()))
            }
            const {login, name, email, password} = req.body
            const userData = await userService.registration(login, name, email, password)
            res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.send(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.send(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refresh_token} = req.cookies
            const token = await userService.logout(refresh_token)
            res.clearCookie('refresh_token')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activation_link = req.params.link 
            await userService.activate(activation_link)
            res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refresh_token} = req.cookies
            const userData = await userService.refresh(refresh_token)
            res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.send(userData)
        } catch (e) {
            next(e)
        }
    }

    // async getUsers(req, res, next) {
    //     try {
    //         res.status(200).json([123, 256])
    //     } catch (e) {
    //         next(e)
    //     }
    // }

}

export default new UserController()