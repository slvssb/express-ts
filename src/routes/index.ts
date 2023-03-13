import { Router } from 'express'

import { errorHandler } from '~/middlewares/error-handler'
import { noRouteMatch } from '~/middlewares/no-route-match'
import { privateRoutes } from '~/routes/private'
import { publicRoutes } from '~/routes/public'

const router = Router()

router.use(publicRoutes)
router.use(privateRoutes)
router.use('*', noRouteMatch)
router.use(errorHandler)

export const apiRoutes = router
