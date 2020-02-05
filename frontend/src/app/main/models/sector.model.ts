import { Warehouse } from './Warehouse.model';
import { Station } from './station.model';

export interface Sector {
    id: string;
    sectorName: string;
    isHidden?: boolean;
    warehouses:Warehouse[];
    stations:Station[];
}
