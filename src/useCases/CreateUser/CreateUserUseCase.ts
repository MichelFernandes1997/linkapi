import { IUserRepository } from '../../repositories/IUserRepository'

import { ICreateUserRequestDTO } from './CreateUserDTO'

import { User } from '../../entities/User'

import { IMailProvider } from '../../providers/IMailProvider'

export class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute (data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error(`User ${userAlreadyExists.name} already exists`)
    } else {
      const user = new User(data)

      await this.usersRepository.save(user)

      await this.mailProvider.sendMail({
        to: {
          email: data.email,
          name: data.name
        },
        from: {
          email: 'teamlinkapi@teste.com',
          name: 'Team LinkApi'
        },
        subject: 'Wellcome to the LinkApi integrations',
        body: '<h1>Account create with success</h1><p>This is a message for you my little partner</p>'
      })

      return user
    }
  }
}
