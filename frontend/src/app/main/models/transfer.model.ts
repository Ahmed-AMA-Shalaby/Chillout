import { Product } from './product.model';
import { Station } from './station.model';
import { Warehouse } from './warehouse.model';
import { Trip } from './trip.model';

export interface Transfer {
    id: string;
    transferredAmount: number;
    day: number;
    month: number;
    year: number;
    hidden?: boolean;
    product: Product;
    station: Station;
    warehouse: Warehouse;
    trip: Trip;
}
