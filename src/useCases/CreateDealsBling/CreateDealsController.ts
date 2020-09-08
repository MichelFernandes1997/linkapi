import { Request, Response } from 'express'

import { CreateDealsBlingUseCase } from './CreateDealsBlingUseCase'

import { DealProvider } from '../../providers/pipedrive/Deals/IDealsProvider'

export class CreateDealsController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private createDealsBlingUseCase: CreateDealsBlingUseCase
  ) {}

  async handle (req: Request, res: Response, dealsObject: Array<DealProvider>): Promise<Response> {
    try {
      const dealsCreatedOnBling = await this.createDealsBlingUseCase.execute(dealsObject)

      return res.status(200).send(dealsCreatedOnBling)
    } catch (error) {
      return res.status(400).send({ message: error.message || 'Unexpected error' })
    }
  }
}
