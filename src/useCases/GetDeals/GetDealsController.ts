import { Request, Response } from 'express'

import { GetDealsUseCase } from './GetDealsUseCase'

export class GetDealsController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private getDealsUseCase: GetDealsUseCase
  ) {}

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const deals = await this.getDealsUseCase.execute()

      return res.status(200).send(deals)
    } catch (error) {
      return res.status(400).send({ message: error.message || 'Unexpected error' })
    }
  }
}
