import { Distance } from './distance.model';
import { Driver } from 'app/main/models/driver.model';
import { Vehicle } from './vehicle.model';
import { Transfer } from './transfer.model';

export interface Trip {
    id: string;
    day: number;
    month: number;
    year: number;
    order: number;
    outboundDistance: Distance;
    inboundDistance: Distance;
    driver: Driver;
    vehicle: Vehicle;
    transfers: Transfer[];
}
