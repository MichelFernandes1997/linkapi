/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
import { DealProvider } from '../../pipedrive/Deals/IDealsProvider'

interface Erros {
    cod: number;
    msg: string;
}

export interface ErrorPurchaseOrder {
    erro: Erros
}

export interface PurchaseOrder {
    numero: string;
    idPedido: number;
    codigos_rastreamento: object;
    volumes: string | null;
}

export interface IGetPurchaseOrderBlingProvider {
    getPurchaseOrder(): Promise<Array<PurchaseOrder> | Array<ErrorPurchaseOrder>>;
}

export interface IPurchaseOrderBlingProvider {
    storeDeals(dealsObject: Array<DealProvider>): Promise<Array<PurchaseOrder> | Array<ErrorPurchaseOrder>>;
}
