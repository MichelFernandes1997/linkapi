import { IDealsRepository } from './IDealsRepository'

import { Deal } from '../entities/Deal'

import DealSchema from '../schema/Deal/DealSchema'

import { GetPurchaseOrderBlingProvider } from '../providers/bling/PurchaseOrder/GetPurchaseOrderBlingProvider'

import { GetPurchaseOrder } from '../providers/bling/PurchaseOrder/IPurchaseOrderBlingProvider'

export class MongoDealsRepository implements IDealsRepository {
  async index (): Promise<Array<Deal>> {
    const dealSchema = await DealSchema.find()

    return dealSchema as unknown as Array<Deal>
  }

  async store (): Promise<void> {
    await DealSchema.find().remove()

    const getPurchaseOrderBlingProvider = new GetPurchaseOrderBlingProvider()

    const getDeals = await getPurchaseOrderBlingProvider.getPurchaseOrder() as Array<GetPurchaseOrder>

    const dealsToInsert = getDeals.map((dealToInsert) => (
      { amount: dealToInsert.pedido.totalvenda, date: dealToInsert.pedido.data }
    ))

    for (const key in dealsToInsert) {
      const deal = new Deal(dealsToInsert[key])

      const dealSchema = new DealSchema(deal)

      dealSchema.save((error, doc) => {
        if (error) throw new Error(error)

        console.log(doc)
      })
    }
  }
}
