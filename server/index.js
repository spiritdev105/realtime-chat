import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { errorHandler } from './middlewares/errMiddleware.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoute.js'
import requestRoute from './routes/requestRoute.js'
import userRoute from './routes/userRoute.js'
import conversationRoute from './routes/conversationRoute.js'
import messageRoute from './routes/messageRoute.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

async function connect() {
    try {
        mongoose.connect(process.env.MONGO);
        console.log('connected to mongodb')
    } catch (error) {
        throw error
    }
}

const origin = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://realtime-chat-app-navy.vercel.app"


app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(cors({
    credentials: true,
    origin
}))

app.use('/api/auth', authRoute)
app.use('/api/request', requestRoute)
app.use('/api/user', userRoute)
app.use('/api/conversation', conversationRoute)
app.use('/api/message', messageRoute)


app.get('/', (req, res) => {
    res.send('Hello from api')
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Running backend server at port ${port}`)
    connect()
})