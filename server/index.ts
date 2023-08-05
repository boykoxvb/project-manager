const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
import {} from 'cors'
import { authRouter } from './src/router/auth-router'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
import errorMiddleware from './src/middleware/error-middleware'
import { projectsRouter } from './src/router/projects-router'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(
  cors({
    origin: [process.env.ORIGIN_1, process.env.ORIGIN_2, process.env.ORIGIN_3],
    credentials: true,
  })
)
app.use(cookieParser())
app.use('/projects', projectsRouter)
app.use('/auth', authRouter)
app.use(errorMiddleware)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()
