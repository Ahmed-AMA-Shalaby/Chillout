import { Product } from './product.model';
import { Company } from './company.model';
import { Warehouse } from './warehouse.model';

export interface Quota {
    id: string;
    quotaAmount: number;
    month: number;
    year: number;
    isHidden?: boolean;
    product: Product;
    company: Company;
    warehouse: Warehouse;
}
