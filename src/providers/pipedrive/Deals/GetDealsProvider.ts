import { IDealsProvider, DealProvider } from './IDealsProvider'

import fetch from 'node-fetch'

require('dotenv/config')

export class GetDealsProvider implements IDealsProvider {
  async getDeals (): Promise<Array<DealProvider>> {
    const status = 'won'

    const start = 0

    const deals = await fetch(`${process.env.API_PIPEDRIVE_BASE_URL}/users/me?api_token=${process.env.API_TOKEN_PIPEDRIVE}`)
      .then(result => result.json())
      .then(result => result.data)
      .then(result => {
        const response = fetch(`${process.env.API_PIPEDRIVE_BASE_URL}/deals?user_id=${result.id}&status=${status}&start=${start}&api_token=${process.env.API_TOKEN_PIPEDRIVE}`)
          .then(result => result.json())
          .then(result => result.data)
          .catch(error => {
            throw new Error(error.message || 'Unexpected error in GetUsersProvider')
          })
        return response
      })
      .catch(error => { throw new Error(error.message || 'Unexpected error when get your user in Pipedrive') })

    return deals
  }
}
