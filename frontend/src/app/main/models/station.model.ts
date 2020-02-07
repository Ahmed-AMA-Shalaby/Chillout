export interface Station {
    id: string;
    stationName: string;
    isHidden?: boolean;
    agent: string;
    sector: string;
    products: string[];
    tanks: string[];
}
