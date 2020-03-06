import { Sector } from './sector.model';
import { Tank } from './tank.model';
import { Agent } from './agent.model';

export interface Station {
    id: string;
    stationCode: number;
    stationName: string;
    stationLocation: string;
    hidden?: boolean;
    agent: Agent;
    sector: Sector;
    tanks: Tank[];
}
