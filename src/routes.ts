import { Router } from 'express'

import { getDealsController } from './useCases/GetDeals'

import { createPurchaseOrderController } from './useCases/CreatePurchaseOrderBling'

import { DealProvider } from './providers/pipedrive/Deals/IDealsProvider'

import { GetProductBlingProvider } from './providers/bling/Products/GetProductBlingProvider'

import { getDealCollectionController } from './useCases/GetDealCollection'

const router = Router()

router.get('/deals/integration', async (req, res) => {
  const dealsObject = await getDealsController.handle(req, res)

  const deal = dealsObject[0]

  if ('id' in deal) {
    const deals = (dealsObject as unknown) as Array<DealProvider>

    const integration = createPurchaseOrderController.handle(req, res, deals)

    return integration
  } else {
    return res.status(500).send('Unexpected Error')
  }
})

router.get('/products', async (req, res) => {
  const getProductBlingProvider = new GetProductBlingProvider()

  const products = await getProductBlingProvider.getProductBling()

  return res.status(200).send(products)
})

router.get('/deals', async (req, res) => {
  const deals = await getDealCollectionController.handle(req, res)

  return res.status(200).send(deals)
})

export { router }
