import { Request, Response } from 'express'

import { GetDealCollectionUseCase } from './GetDealCollectionUseCase'

import { Deal } from '../../entities/Deal'

export class GetDealCollectionController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private getDealCollectionUseCase: GetDealCollectionUseCase
  ) {}

  async handle (req: Request, res: Response): Promise<Array<Deal> | Response> {
    try {
      const dealsCollection = await this.getDealCollectionUseCase.execute()

      return dealsCollection
    } catch (error) {
      return res.status(400).send({ message: error.message || 'Unexpected error' })
    }
  }
}
