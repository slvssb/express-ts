import 'dotenv/config'

import { networkInterfaces } from 'os'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from '~/configs/env'
import { apiRoutes } from '~/routes'
import logger from '~/utils/logger'

const currentIP = networkInterfaces().en0?.[1].address ?? ''

function startAppInstance() {
  const app = express()

  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(morgan('dev'))
  app.use(apiRoutes)

  app.listen(env.PORT, () => {
    logger.info(`🚀 ENV => ${env.NODE_ENV} · PORT => ${env.PORT} · IP => ${currentIP}`)
  })
}

function main() {
  // await connectDb()
  startAppInstance()
}

void main()
