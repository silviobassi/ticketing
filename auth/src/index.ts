import express, { Request, Response } from 'express'
import 'express-async-errors'

import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import cookieSession from 'cookie-session'
import mongoose from 'mongoose'

const app = express()
app.enable('trust proxy')
app.use(express.json())
app.use(cookieSession({ signed: false, secure: true }))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDb')
  } catch (error) {
    console.error(error)
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!')
  })
}

start()
