import { NextFunction, Request, Response } from 'express'
import { NotAuthorizedError } from './not-authorized-error'

interface UserPayload {
  id: string
  email: string
}

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: UserPayload
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError()
  }

  next()
}
