import { type ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { ClientError } from '~/utils/client-error'
import { logError } from '~/utils/logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  if (!res.headersSent) {
    if (err instanceof ClientError) {
      // Manually thrown error
      res.status(err.status).send(err.message)
    } else if (err instanceof ZodError) {
      // Error thrown from zod validation
      const zodMessage = fromZodError(err).message
      res.status(400).send(zodMessage)
    } else if (err.message.includes('Invariant')) {
      // error thrown from invariant validation
      res.status(400).send(err.message.split(':')[1])
    } else {
      // other errors
      res.status(500).send('Something went wrong')
    }
  }

  logError(err)
}
