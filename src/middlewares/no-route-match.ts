import { type RequestHandler } from 'express'

import logger from '~/utils/logger'

export const noRouteMatch: RequestHandler = (req, res) => {
  res.status(405).send('Not Allowed')
  logger.warn(`${req.method} ${req.originalUrl} => DOES NOT EXIST`)
}
