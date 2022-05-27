/**
 * @export
 * @interface IProduct
 */
export interface IProduct{
    id: number,
    name: string,
    description: string,
    defaultImage: string,
    images: string[],
    price: number,
    discount: number,
    quantity?: number
}

/**
 * @export
 * @interface IProductQuantity
 */
export interface IProductQuantity{
    id: number,
    quantity: number,
}