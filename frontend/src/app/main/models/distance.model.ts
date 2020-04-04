import { Warehouse } from './warehouse.model';
import { Station } from './station.model';

export interface Distance {
    id: string;
    distance: number;
    warehouse: Warehouse;
    station: Station
}
