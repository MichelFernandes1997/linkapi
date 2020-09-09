import { IPurchaseOrderBlingProvider } from '../../providers/bling/PurchaseOrder/IPurchaseOrderBlingProvider'

import { DealProvider } from '../../providers/pipedrive/Deals/IDealsProvider'

export class CreatePurchaseOrderBlingUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private purchaseOrderBlingProvider: IPurchaseOrderBlingProvider
  ) {}

  async execute (dealsObject: Array<DealProvider>): Promise<string> {
    try {
      const purchaseOrderCreatedOnBling = this.purchaseOrderBlingProvider.storeDeals(dealsObject)

      return purchaseOrderCreatedOnBling
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
