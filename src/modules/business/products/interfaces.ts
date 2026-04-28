
// ------------------------------------------

/*
interface IProduct {
    name: string;
    object: string;
    stock: number;
    price: { base: number, min: number, max: number };
    inWarehouse: boolean;
}
*/

export type ProductType = "ITEM";



export interface IBusinessProduct {
    uid: number;
    name: string;
    price: number;
    type: ProductType;
    stock: number;
}