import { Product } from './product.model';

export interface Tank {
    id: string;
    tankVolume: number;
    hidden?: boolean;
    product: Product;
}
