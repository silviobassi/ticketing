import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: UserPayload
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
   /* eslint-disable */
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload
  } catch (error) { }

  next()
}
