import { Sector } from './sector.model';
import { Product } from './product.model';

export interface Warehouse {
    id: string;
    warehouseName: string;
    companyName: string;
    hidden?: boolean;
    sector: Sector;
    products: Product[];
}
