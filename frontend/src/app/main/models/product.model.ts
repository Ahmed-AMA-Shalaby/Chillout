import { Warehouse } from './Warehouse.model';
import { Station } from './station.model';

export interface Product {
    id: string;
    productName: string;
    isHidden?: boolean;
    warehouses: Warehouse[];
    stations: Station[];
}
