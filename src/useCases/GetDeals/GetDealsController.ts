import { Request, Response } from 'express'

import { GetDealsUseCase } from './GetDealsUseCase'

import { DealProvider } from '../../providers/pipedrive/Deals/IDealsProvider'

export class GetDealsController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private getDealsUseCase: GetDealsUseCase
  ) {}

  async handle (req: Request, res: Response): Promise<Array<DealProvider> | Response> {
    try {
      const deals = await this.getDealsUseCase.execute()

      return deals
    } catch (error) {
      return res.status(400).send({ message: error.message || 'Unexpected error' })
    }
  }
}
