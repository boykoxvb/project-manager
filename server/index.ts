const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
import {} from 'cors'
import { authRouter } from './src/router/auth-router'
require('dotenv').config()
import errorMiddleware from './src/middleware/error-middleware'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin : ['http://localhost:8080'],
    credentials: true,
}))
app.use(cookieParser())
app.use('/api', authRouter)
app.use(errorMiddleware)

const start = async() => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

start()

