import { Warehouse } from './Warehouse.model';
import { Station } from './station.model';

export interface Distance {
    id: string;
    distance: number;
    isHidden?: boolean;
    warehouse: Warehouse;
    station: Station
}
