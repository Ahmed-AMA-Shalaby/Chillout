export interface Warehouse {
    id: string;
    warehouseName: string;
    isHidden?: boolean;
    sector: string;
    products: string[];
    companies: string[];
}
