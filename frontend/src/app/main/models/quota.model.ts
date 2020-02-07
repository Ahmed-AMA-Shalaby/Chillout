export interface Quota {
    id: string;
    quotaAmount: number;
    month: number;
    year: number;
    isHidden?: boolean;
    product: string;
    company:string;
    warehouse: string;
}
