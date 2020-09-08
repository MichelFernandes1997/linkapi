import { Router } from 'express'

import { createUserController } from './useCases/CreateUser'

import { getDealsController } from './useCases/GetDeals'

import { createDealsController } from './useCases/CreateDealsBling'

const router = Router()

router.post('/users', (req, res) => {
  return createUserController.handle(req, res)
})

router.get('/deals', (req, res) => {
  return getDealsController.handle(req, res)
})

router.get('/deals/integration', async (req, res) => {
  const dealsObject = await getDealsController.handle(req, res)

  if ('id' in dealsObject) {
    const integration = createDealsController.handle(req, res, dealsObject)

    return integration
  } else {
    return res.status(500).send('Unexpected Error')
  }
})

export { router }
