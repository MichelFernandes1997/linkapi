import { IDealsRepository } from './IDealsRepository'

import { Deal } from '../entities/Deal'

import DealSchema from '../schema/Deal/DealSchema'
import { GetPurchaseOrderBlingProvider } from '../providers/bling/PurchaseOrder/GetPurchaseOrderBlingProvider'

export class MongoDealsRepository implements IDealsRepository {
    private deals

    constructor () {
      this.deals = DealSchema
    }

    // async index (): Promise<Array<Deal>> {

    // }

    async store (): Promise<Deal> {
      const getPurchaseOrderBlingProvider = new GetPurchaseOrderBlingProvider()

      const deal = await getPurchaseOrderBlingProvider.getPurchaseOrder()

      const dealsStored = this.deals.insertMany(deal, function (err, res) {
        if (err) throw err

        console.log('Number of documents inserted: ' + res.insertedCount)

        return res.ops
      })

      return dealsStored
    }
}
