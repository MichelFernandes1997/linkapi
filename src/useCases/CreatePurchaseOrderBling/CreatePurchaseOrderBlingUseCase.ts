import { IPurchaseOrderBlingProvider, PurchaseOrder, ErrorPurchaseOrder } from '../../providers/bling/PurchaseOrder/IPurchaseOrderBlingProvider'

import { DealProvider } from '../../providers/pipedrive/Deals/IDealsProvider'

export class CreatePurchaseOrderBlingUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private purchaseOrderBlingProvider: IPurchaseOrderBlingProvider
  ) {}

  async execute (dealsObject: Array<DealProvider>): Promise<Array<PurchaseOrder> | Array<ErrorPurchaseOrder>> {
    try {
      const purchaseOrderCreatedOnBling = this.purchaseOrderBlingProvider.storeDeals(dealsObject)

      return purchaseOrderCreatedOnBling
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
