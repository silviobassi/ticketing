import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validation-request'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(201).send({})
  },
)

export { router as signinRouter }
