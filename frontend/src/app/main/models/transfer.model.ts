import { Product } from './product.model';
import { Station } from './station.model';

export interface Transfer {
    id: string;
    day: number;
    month: number;
    year: number;   
    product: Product;
    station: Station;
    transferredAmount: number;
}
