import { IProductBlingProvider, ProductBling, Error } from './IProductBlingProvider'

import fetch from 'node-fetch'

require('dotenv/config')

export class GetProductBlingProvider implements IProductBlingProvider {
  async getProductBling (): Promise<Array<ProductBling> | Error> {
    try {
      const products = await fetch(`${process.env.API_BLING_BASE_URL}/produtos/json/&apikey=${process.env.API_TOKEN_BLING}`)
        .then(result => result.json())
        .then(result => result.retorno)
        .catch(error => { throw new Error(error.message || 'Unexpected Error') })

      if ('erros' in products) {
        return products.erros
      }

      return products.produtos
    } catch (error) {
      throw new Error(error.message || 'Unexpected')
    }
  }
}
