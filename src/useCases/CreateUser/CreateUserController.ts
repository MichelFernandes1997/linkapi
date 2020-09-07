import { Request, Response } from 'express'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  // eslint-disable-next-line no-useless-constructor
  constructor (
        private createUserUseCase: CreateUserUseCase
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    try {
      const userCreated = await this.createUserUseCase.execute({ name, email, password })

      return response.status(201).send(userCreated)
    } catch (error) {
      return response.status(400).send({
        message: error.message || 'Unexpected error/'
      })
    }
  }
}
