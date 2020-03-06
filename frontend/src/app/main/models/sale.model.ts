import { Product } from './product.model';
import { Station } from './station.model';

export interface Sale {
    id: string;
    saleAmount: number;
    day: number;
    month: number;
    year:number;
    hidden?: boolean;
    product: Product;
    station: Station;
}
