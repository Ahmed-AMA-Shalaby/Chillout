export interface Transfer {
    id: string;
    transferredAmount: number;
    day: number;
    month: number;
    year: number;
    isHidden?: boolean;
    product: string;
    station: string;
    company: string;
    warehouse: string;
    trip: string;
}
