import { GetDealsProvider } from '../../providers/pipedrive/Deals/GetDealsProvider'

import { GetDealsUseCase } from './GetDealsUseCase'

import { GetDealsController } from './GetDealsController'

const getDealsProvider = new GetDealsProvider()

const getDealsUseCase = new GetDealsUseCase(getDealsProvider)

const getDealsController = new GetDealsController(getDealsUseCase)

export { getDealsUseCase, getDealsController }
