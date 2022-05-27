import { IProductQuantity } from "./product";

/**
 * @export
 * @interface ICart
 */
export interface ICart{
    id: number, // User id
    products: IProductQuantity[]
}