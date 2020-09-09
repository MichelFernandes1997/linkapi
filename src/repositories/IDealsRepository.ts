import { Deal } from '../entities/Deal'

export interface IDealsRepository {
    index(): Promise<Array<Deal>>;
    store(): Promise<void>;
}
