/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPurchaseOrderBlingProvider, PurchaseOrder, ErrorPurchaseOrder } from './IPurchaseOrderBlingProvider'

import fetch from 'node-fetch'

import { DealProvider } from '../../pipedrive/Deals/IDealsProvider'

import { GetProductBlingProvider } from '../Products/GetProductBlingProvider'

import { ProductBling, Error } from '../Products/IProductBlingProvider'

import { MongoDealsRepository } from '../../../repositories/MongoDealsRepository'

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

      let dealsToCreateProducts

      const dealsAreCreated = []

      const dealsId = []

      if ('produto' in products[0] && 'length' in products) {
        if (dealsObject.length > products.length) {
          for (const deals in dealsObject) {
            for (const product in products) {
              // eslint-disable-next-line eqeqeq
              if (dealsObject[deals].id == products[product].produto.codigo as unknown as number) {
                dealsAreCreated.push(deals)
              }
            }

            dealsId.push(deals)
          }

          dealsToCreateProducts = dealsId.filter(x => !dealsAreCreated.includes(x))
        }
      }

      let data

      if ('erro' in products[0] || dealsToCreateProducts !== undefined) {
        if ('erro' in products[0]) {
          const jsonWithAllData = dealsObject.map((dealObject) => (
            {
              descricao: dealObject.title,
              vlr_unit: dealObject.value,
              codigo: dealObject.id
            }
          ))

          data = `apikey=${process.env.API_TOKEN_BLING}&xml=${js2xmlparser.parse('produto', jsonWithAllData)}`
        } else {
          const jsonWithData = dealsToCreateProducts.map((dealObjectID) => (
            {
              descricao: dealsObject[dealObjectID].title,
              vlr_unit: dealsObject[dealObjectID].value,
              codigo: dealsObject[dealObjectID].id
            }
          ))

          data = `apikey=${process.env.API_TOKEN_BLING}&xml=${js2xmlparser.parse('produto', jsonWithData)}`
        }

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
          const purchaseOrderToCreate = 'erro' in products[0]
            ? dealsObject.map((dealsObject, key) => (
              {
                cliente: {
                  nome: dealsObject.creator_user_id.name
                },
                itens: {
                  item: {
                    descricao: createdProduct[key][0].produto.descricao,
                    codigo: createdProduct[key][0].produto.codigo,
                    vlr_unit: createdProduct[key][0].produto.preco,
                    qtde: 1
                  }
                }
              }
            ))
            : dealsToCreateProducts.map((dealObjectID, key) => (
              {
                cliente: {
                  nome: dealsObject[dealObjectID].creator_user_id.name
                },
                itens: {
                  item: {
                    descricao: createdProduct[key][0].produto.descricao,
                    codigo: createdProduct[key][0].produto.codigo,
                    vlr_unit: createdProduct[key][0].produto.preco,
                    qtde: 1
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

          try {
            // eslint-disable-next-line new-parens
            const mongoRepository = new MongoDealsRepository()

            await mongoRepository.store()
          } catch (error) {
            throw new Error(error.message || 'Unexpected Error')
          }

          return created
        } else {
          throw new Error('Unexpected Error')
        }
      } else {
        return [{ erro: { cod: 0, msg: 'No have deals to integrate in Bling :)' } }]
      }
    } catch (error) {
      throw new Error(error.message || 'Unexpected Error')
    }
  }
}
