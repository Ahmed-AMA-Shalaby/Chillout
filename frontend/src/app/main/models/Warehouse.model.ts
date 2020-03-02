import { Sector } from './sector.model';
import { Product } from './product.model';
import { Company } from './company.model';

export interface Warehouse {
    id: string;
    warehouseName: string;
    isHidden?: boolean;
    sector: Sector;
    products: Product[];
    companies: Company[];
}
