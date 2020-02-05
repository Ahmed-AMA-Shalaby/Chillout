import { Station } from './station.model';

export interface Agent {
    id: string;
    agentName: string;
    isHidden?: boolean;
    stations: Station[];
}
