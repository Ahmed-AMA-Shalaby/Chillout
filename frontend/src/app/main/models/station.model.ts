import { Agent } from 'http';
import { Sector } from './sector.model';
import { Product } from './product.model';
import { Tank } from './tank.model';

export interface Station {
    id: string;
    stationName: string;
    isHidden?: boolean;
    agent: Agent;
    sector: Sector;
    products: Product[];
    tanks: Tank[];
}
