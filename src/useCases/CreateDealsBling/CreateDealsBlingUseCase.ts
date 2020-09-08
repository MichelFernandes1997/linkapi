import { IDealsBlingProvider } from '../../providers/bling/Deals/IDealsBlingProvider'

import { DealProvider } from '../../providers/pipedrive/Deals/IDealsProvider'

export class CreateDealsBlingUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private dealsBlingProvider: IDealsBlingProvider
  ) {}

  async execute (dealsObject: Array<DealProvider>): Promise<boolean> {
    try {
      const dealsCreatedOnBling = this.dealsBlingProvider.storeDeals(dealsObject)

      return dealsCreatedOnBling
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
