import { Product } from './product.model';
import { Station } from './station.model';

export interface Existing {
    id: string;
    existingAmount: number;
    day: number;
    month: number;
    year: number;
    hidden?: boolean;
    product: Product
    station: Station
}
