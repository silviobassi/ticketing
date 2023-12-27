import express, { Request, Response } from 'express'
import 'express-async-errors'

import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import cookieSession from 'cookie-session'

const app = express()
app.enable('trust proxy')
app.use(express.json())
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }),
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
