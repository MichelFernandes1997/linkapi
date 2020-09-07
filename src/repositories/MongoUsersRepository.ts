import { IUserRepository } from './IUserRepository'

import { User } from '../entities/User'

import UserSchema from '../schema/User/UserSchema'

export class MongoUsersRepository implements IUserRepository {
    private users

    constructor () {
      this.users = UserSchema
    }

    async findByEmail (email: string): Promise<User> {
      const user = await this.users.findOne({ email }).exec()

      return user
    }

    async save (user: User): Promise<void> {
      try {
        const userCreated = await this.users.create(user)

        return userCreated
      } catch (error) {
        return error.message || 'Unexpected error creating user'
      }
    }
}
