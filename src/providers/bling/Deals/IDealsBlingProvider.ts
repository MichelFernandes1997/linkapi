import { DealProvider } from '../../pipedrive/Deals/IDealsProvider'

export interface IDealsBlingProvider {
    storeDeals(dealsObject: Array<DealProvider>): Promise<boolean>;
}
