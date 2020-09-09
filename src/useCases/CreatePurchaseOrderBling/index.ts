import { CreatePurchaseOrderBlingProvider } from '../../providers/bling/PurchaseOrder/CreatePurchaseOrderBlingProvider'

import { CreatePurchaseOrderBlingUseCase } from './CreatePurchaseOrderBlingUseCase'

import { CreatePurchaseOrderController } from './CreatePurchaseOrderController'

import { GetProductBlingProvider } from '../../providers/bling/Products/GetProductBlingProvider'

const getProductBlingProvider = new GetProductBlingProvider()

const createPurchaseOrderBlingProvider = new CreatePurchaseOrderBlingProvider(getProductBlingProvider)

const createPurchaseOrderBlingUseCase = new CreatePurchaseOrderBlingUseCase(createPurchaseOrderBlingProvider)

const createPurchaseOrderController = new CreatePurchaseOrderController(createPurchaseOrderBlingUseCase)

export { createPurchaseOrderBlingUseCase, createPurchaseOrderController }
