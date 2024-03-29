import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters')
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  /* eslint-disable */
  serializeErrors(): any[] {
    return this.errors.map((error: ValidationError) => {
      if (error.type === 'field')
        return { message: error.msg, field: error.path }
      return []
    })
  }
}
