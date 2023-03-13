import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => res.status(200).send('Hello, world!'))
router.get('/ping', (_req, res) => res.status(200).send('pong'))

export const publicRoutes = router
