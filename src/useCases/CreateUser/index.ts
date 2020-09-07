import { MailtrapMailProvider } from '../../providers/MailtrapMailProvider'

import { MongoUsersRepository } from '../../repositories/MongoUsersRepository'

import { CreateUserUseCase } from './CreateUserUseCase'

import { CreateUserController } from './CreateUserController'

const mailtrapMailProvider = new MailtrapMailProvider()

const mongoUsersRepository = new MongoUsersRepository()

const createUserUseCase = new CreateUserUseCase(
  mongoUsersRepository,
  mailtrapMailProvider
)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }
