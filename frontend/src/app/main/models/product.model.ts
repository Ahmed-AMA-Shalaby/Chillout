export interface Product {
    id: string;
    productName: string;
    isHidden?: boolean;
    warehouses: string[];
    stations: string[];
}
