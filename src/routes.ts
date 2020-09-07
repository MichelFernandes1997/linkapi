import { Router } from 'express'

import { createUserController } from './useCases/CreateUser'

import { getDealsController } from './useCases/GetDeals'

const router = Router()

router.post('/users', (req, res) => {
  return createUserController.handle(req, res)
})

router.get('/deals', (req, res) => {
  return getDealsController.handle(req, res)
})

export { router }
