import { IDealsBlingProvider } from './IDealsBlingProvider'

import fetch from 'node-fetch'

import { DealProvider } from '../../pipedrive/Deals/IDealsProvider'

// import qs from 'querystring'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const js2xmlparser = require('js2xmlparser')

require('dotenv/config')

export class CreateDealsBlingProvider implements IDealsBlingProvider {
  async storeDeals (dealsObject: Array<DealProvider>): Promise<boolean> {
    console.log(dealsObject)
    try {
      const jsonWithData = {
        descricao: 'Item teste da integração 2',
        vlr_unit: 10.00
      }

      const data = `apikey=${process.env.API_TOKEN_BLING}&xml=${js2xmlparser.parse('produto', jsonWithData)}`

      const createdDeals: Array<any> = await fetch(`${process.env.API_BLING_BASE_URL}/produto/json/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': `${data.length}` },
          body: data
        }
      )
        .then(result => result.json())
        .then(result => result.retorno.produtos)
        .catch(error => { throw new Error(error.message || 'Unexpected Error') })

      console.log(createdDeals)

      if (createdDeals.length > 0) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
