import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database'
  statusCode = 500

  constructor() {
    super('Error connection to db')

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }]
  }
}
