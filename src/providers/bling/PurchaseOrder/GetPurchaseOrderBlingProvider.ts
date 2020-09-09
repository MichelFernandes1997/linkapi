/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetPurchaseOrderBlingProvider, PurchaseOrder, ErrorPurchaseOrder } from './IPurchaseOrderBlingProvider'

import fetch from 'node-fetch'

require('dotenv/config')

export class GetPurchaseOrderBlingProvider implements IGetPurchaseOrderBlingProvider {
  async getPurchaseOrder (): Promise<Array<PurchaseOrder> | Array<ErrorPurchaseOrder>> {
    try {
      const purchaseOrders = await fetch(`${process.env.API_BLING_BASE_URL}/pedidos/json/&apikey=${process.env.API_TOKEN_BLING}`)
        .then(result => result.json())
        .then(result => {
          if ('erros' in result.retorno) {
            return result.retorno.erros
          } else {
            return result.retorno.pedidos
          }
        })
        .catch(error => { throw new Error(error.message || 'Unexpected Error') })

      console.log(purchaseOrders)

      return purchaseOrders
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
