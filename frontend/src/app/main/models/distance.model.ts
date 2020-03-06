import { Warehouse } from './warehouse.model';
import { Station } from './station.model';

export interface Distance {
    id: string;
    distance: number;
    hidden?: boolean;
    warehouse: Warehouse;
    station: Station
}
