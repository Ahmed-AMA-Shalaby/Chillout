import { Product } from './product.model';
import { Station } from './station.model';

export interface Tank {
    id: string;
    tankVolume: number;
    isHidden?: boolean;
    product: Product;
    stations: Station[];
}
