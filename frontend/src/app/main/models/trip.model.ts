import { Distance } from './distance.model';
import { Driver } from 'selenium-webdriver/chrome';
import { Vehicle } from './vehicle.model';

export interface Trip {
    id: string;
    day: number;
    month: number;
    year:number;
    isHidden?: boolean;
    transfers:string[];
    outboundDistance: Distance;
    inboundDistance: Distance;
    driver: Driver;
    vehicle: Vehicle;
}
