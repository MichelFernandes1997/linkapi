import { MongoDealsRepository } from '../../repositories/MongoDealsRepository'

import { Deal } from '../../entities/Deal'

export class GetDealCollectionUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
          private repositoryProvider: MongoDealsRepository
  ) {}

  async execute (): Promise<Array<Deal>> {
    try {
      const dealsCollection = this.repositoryProvider.index()

      return dealsCollection
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
