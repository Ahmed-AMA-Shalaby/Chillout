export interface Sale {
    id: string;
    saleAmount: number;
    day: number;
    month: number;
    year:number;
    isHidden?: boolean;
    product:string;
    station:string;
}
