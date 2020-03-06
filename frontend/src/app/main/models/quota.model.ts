import { Product } from './product.model';
import { Warehouse } from './warehouse.model';

export interface Quota {
    id: string;
    quotaAmount: number;
    month: number;
    year: number;
    hidden?: boolean;
    product: Product;
    warehouse: Warehouse;
}
