import { ILocation } from './location';
import { ISeller } from './seller';
import { IProductData } from './product-data';

export interface IProduct {
    name: string,
    price: number,
    quantity: number,
    images: String[],
    commission: number,
    saved: boolean,
    sharedCount: number,
    description: string,
    location: ILocation,
    seller: ISeller,
    productData: IProductData
}