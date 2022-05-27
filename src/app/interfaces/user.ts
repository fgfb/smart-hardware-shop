import { IProductQuantity } from "./product"

/**
 * @export
 * @interface IUser
 */
 export interface IUser{
    id: number,
    name: {
        firstName: string,
        lastName: string,
    }
    phone: string,
    avatar: string,
    email: string,
    address: {
        country: string,
        city: string,
        zip: string,
        street: string,
    },
    orders: IOrder[],
    role: 'ADMIN' | 'CUSTOMER'
}

/**
 * @export
 * @interface IOrder
 */
export interface IOrder{
    id: number,
    products: IProductQuantity[]
}