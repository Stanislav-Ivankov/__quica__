import { ILocation } from "./location";

export interface IListing {
    category: string,
    name: string,
    condition: string,
    description: string,
    price: number,
    comission: number,
    percent: number,
    location: ILocation,
    shipping: string[],
    images: string[]
}