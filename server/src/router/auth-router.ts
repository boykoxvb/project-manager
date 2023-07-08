const Router = require('express').Router
const authRouter = new Router()
import userController from "../controllers/user-controller"
import { body } from "express-validator"
import authMiddleware from "../middleware/auth-middleware"

authRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
authRouter.post('/login', userController.login)
authRouter.post('/logout', userController.logout)
authRouter.get('/activate/:link', userController.activate)
authRouter.get('/refresh', userController.refresh)
// authRouter.get('/users', userController.getUsers)

export { authRouter }