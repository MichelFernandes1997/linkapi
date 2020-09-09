import { MongoDealsRepository } from '../../repositories/MongoDealsRepository'

import { GetDealCollectionUseCase } from './GetDealCollectionUseCase'

import { GetDealCollectionController } from './GetDealCollectionController'

const repositoryProvider = new MongoDealsRepository()

const getDealCollectionUseCase = new GetDealCollectionUseCase(repositoryProvider)

const getDealCollectionController = new GetDealCollectionController(getDealCollectionUseCase)

export { getDealCollectionUseCase, getDealCollectionController }
