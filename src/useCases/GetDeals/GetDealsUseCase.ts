import { IDealsProvider, DealProvider } from '../../providers/pipedrive/Deals/IDealsProvider'

export class GetDealsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private dealsProvider: IDealsProvider
  ) {}

  async execute (): Promise<Array<DealProvider>> {
    try {
      const deals = this.dealsProvider.getDeals()

      return deals
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
