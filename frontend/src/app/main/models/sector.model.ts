export interface Sector {
    id: string;
    sectorName: string;
    isHidden?: boolean;
    warehouses: string[];
    stations: string[];
}
