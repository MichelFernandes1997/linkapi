import { Request, Response } from 'express'

import { CreatePurchaseOrderBlingUseCase } from './CreatePurchaseOrderBlingUseCase'

import { DealProvider } from '../../providers/pipedrive/Deals/IDealsProvider'

export class CreatePurchaseOrderController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private createPurchaseOrderBlingUseCase: CreatePurchaseOrderBlingUseCase
  ) {}

  async handle (req: Request, res: Response, dealsObject: Array<DealProvider>): Promise<Response> {
    try {
      const purchaseOrderCreatedOnBling = await this.createPurchaseOrderBlingUseCase.execute(dealsObject)

      return res.status(200).send(purchaseOrderCreatedOnBling)
    } catch (error) {
      return res.status(400).send({ message: error.message || 'Unexpected error' })
    }
  }
}
