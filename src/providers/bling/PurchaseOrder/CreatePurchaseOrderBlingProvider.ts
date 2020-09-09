/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPurchaseOrderBlingProvider, PurchaseOrder, ErrorPurchaseOrder } from './IPurchaseOrderBlingProvider'

import fetch from 'node-fetch'

import { DealProvider } from '../../pipedrive/Deals/IDealsProvider'

import { GetProductBlingProvider } from '../Products/GetProductBlingProvider'

import { ProductBling, Error } from '../Products/IProductBlingProvider'

// import qs from 'querystring'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const js2xmlparser = require('js2xmlparser')

require('dotenv/config')

export class CreatePurchaseOrderBlingProvider implements IPurchaseOrderBlingProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private getProductBlingProvider: GetProductBlingProvider
  ) {

  }

  async storeDeals (dealsObject: Array<DealProvider>): Promise<Array<PurchaseOrder> | Array<ErrorPurchaseOrder>> {
    try {
      const products = await this.getProductBlingProvider.getProductBling()

      if ('erro' in products[0]) {
        const jsonWithData = dealsObject.map((dealObject) => (
          {
            descricao: dealObject.title,
            vlr_unit: dealObject.value,
            codigo: dealObject.id
          }
        ))
        const data = `apikey=${process.env.API_TOKEN_BLING}&xml=${js2xmlparser.parse('produto', jsonWithData)}`

        const createdProduct: Array<ProductBling> = await fetch(`${process.env.API_BLING_BASE_URL}/produto/json/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': `${data.length}` },
            body: data
          }
        )
          .then(result => result.json())
          .then(result => result.retorno.produtos)
          .catch(error => { throw new Error(error.message || 'Unexpected Error') })

        if (createdProduct.length > 0) {
          const purchaseOrderToCreate = dealsObject.map((dealObject, key) => (
            {
              cliente: {
                nome: dealObject.creator_user_id.name
              },
              itens: {
                item: {
                  descricao: createdProduct[key][0].produto.descricao,
                  codigo: createdProduct[key][0].produto.codigo
                }
              }
            }
          ))

          const created = []

          for (const purchaseOrder in purchaseOrderToCreate) {
            const dataPurchaseOrder = `apikey=${process.env.API_TOKEN_BLING}&xml=${js2xmlparser.parse('pedido', purchaseOrderToCreate[purchaseOrder])}`

            const createdPurchaseOrders: Array<PurchaseOrder> | Array<ErrorPurchaseOrder> = await fetch(`${process.env.API_BLING_BASE_URL}/pedido/json/`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': `${dataPurchaseOrder.length}` },
                body: dataPurchaseOrder
              }
            )
              .then(result => result.json())
              .then(result => {
                if ('erros' in result.retorno) {
                  return result.retorno.erros
                } else {
                  return result.retorno.pedidos
                }
              })
              .catch(error => { throw new Error(error.message || 'Unexpected Error') })

            console.log(createdPurchaseOrders)

            created.push(createdPurchaseOrders)
          }

          return created
        } else {
          throw new Error('Unexpected Error')
        }
      } else {
        const purchaseOrderToCreate = dealsObject.map((dealObject, key) => (
          {
            cliente: {
              nome: dealObject.creator_user_id.name
            },
            itens: {
              item: {
                descricao: products[key].produto.descricao,
                codigo: products[key].produto.codigo
              }
            }
          }
        ))

        const created = []

        for (const purchaseOrder in purchaseOrderToCreate) {
          const dataPurchaseOrder = `apikey=${process.env.API_TOKEN_BLING}&xml=${js2xmlparser.parse('pedido', purchaseOrderToCreate[purchaseOrder])}`

          const createdPurchaseOrders: Array<PurchaseOrder> | Array<ErrorPurchaseOrder> = await fetch(`${process.env.API_BLING_BASE_URL}/pedido/json/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': `${dataPurchaseOrder.length}` },
              body: dataPurchaseOrder
            }
          )
            .then(result => result.json())
            .then(result => {
              if ('erros' in result.retorno) {
                return result.retorno.erros
              } else {
                return result.retorno.pedidos
              }
            })
            .catch(error => { throw new Error(error.message || 'Unexpected Error') })

          created.push(createdPurchaseOrders)
        }

        return created
      }
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
