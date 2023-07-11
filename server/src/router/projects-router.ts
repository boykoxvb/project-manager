const Router = require('express').Router
const projectsRouter = new Router()
import { body } from "express-validator"
import authMiddleware from "../middleware/auth-middleware"
import projectsController from "../controllers/projects-controller"

// projectsRouter.post('/registration',
//     body('email').isEmail(),
//     body('password').isLength({min: 3, max: 32}),
//     userController.registration)
// projectsRouter.post('/login', userController.login)
// projectsRouter.post('/logout', userController.logout)
// projectsRouter.get('/activate/:link', userController.activate)
// projectsRouter.get('/refresh', userController.refresh)


projectsRouter.get('/groups/all', authMiddleware, projectsController.allGroups)
projectsRouter.post('/groups', authMiddleware, projectsController.addGroup)
projectsRouter.put('/groups/:id', authMiddleware, projectsController.changeGroup)
projectsRouter.delete('/groups/:id', authMiddleware, projectsController.deleteGroup)

projectsRouter.post('/', authMiddleware, projectsController.addProject)
projectsRouter.put('/:id', authMiddleware, projectsController.changeProject)
projectsRouter.delete('/:id', authMiddleware, projectsController.deleteProject)


export { projectsRouter }