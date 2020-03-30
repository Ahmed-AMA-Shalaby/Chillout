import { Product } from './product.model';
import { Station } from './station.model';

export interface Existing {
    id: string;
    existingAmount: number;
    day: number;
    month: number;
    year: number;
    product: Product
    station: Station
}
