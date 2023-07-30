const Router = require('express').Router
const projectsRouter = new Router()
import authMiddleware from "../middleware/auth-middleware"
import projectsController from "../controllers/projects-controller"

projectsRouter.get('/groups/all', authMiddleware, projectsController.allGroups)
projectsRouter.post('/groups', authMiddleware, projectsController.addGroup)
projectsRouter.put('/groups/:id', authMiddleware, projectsController.changeGroup)
projectsRouter.delete('/groups/:id', authMiddleware, projectsController.deleteGroup)

projectsRouter.put('/', authMiddleware, projectsController.changeProject)
projectsRouter.delete('/', authMiddleware, projectsController.deleteProject)

projectsRouter.post('/tasks', authMiddleware, projectsController.addTask)
projectsRouter.put('/tasks', authMiddleware, projectsController.changeTask)
projectsRouter.put('/tasks/finish', authMiddleware, projectsController.finishTask)

export { projectsRouter }