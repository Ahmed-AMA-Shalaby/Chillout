export interface Trip {
    id: string;
    day: number;
    month: number;
    year:number;
    isHidden?: boolean;
    transfers:string[];
    outboundDistance: string;
    inboundDistance: string;
    driver: string;
    vehicle: string;
}
