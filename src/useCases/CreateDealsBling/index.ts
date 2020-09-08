import { CreateDealsBlingProvider } from '../../providers/bling/Deals/CreateDealsBlingProvider'

import { CreateDealsBlingUseCase } from './CreateDealsBlingUseCase'

import { CreateDealsController } from './CreateDealsController'

const createDealsBlingProvider = new CreateDealsBlingProvider()

const createDealsBlingUseCase = new CreateDealsBlingUseCase(createDealsBlingProvider)

const createDealsController = new CreateDealsController(createDealsBlingUseCase)

export { createDealsBlingUseCase, createDealsController }
