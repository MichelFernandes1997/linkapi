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
      .then(async result => {
        if (result.id) {
          const response = await fetch(`${process.env.API_PIPEDRIVE_BASE_URL}/deals?user_id=${result.id}&status=${status}&start=${start}&api_token=${process.env.API_TOKEN_PIPEDRIVE}`)
            .then(result => result.json())
            .then(result => result.data)
            .catch(error => {
              throw new Error(error.message || 'Unexpected error in GetDealsProvider')
            })

          return response
        } else {
          throw new Error('Unexpected error when get your user in Pipedrive')
        }
      })
      .catch(error => { throw new Error(error.message || 'Unexpected error in GetDealsProvider') })

    if (deals) {
      return deals
    } else if (deals === null) {
      throw new Error('You no have deals in Pipedrive')
    } else {
      throw new Error('Unexpected error when get your deals of Pipedrive')
    }
  }
}
