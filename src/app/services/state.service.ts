import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private cartData: Subject<IProduct[]> = new Subject<IProduct[]>();

  data: Observable<IProduct[]> = this.cartData.asObservable();

  cartList: IProduct[] = [];

  constructor() { }

  addCartData(product: IProduct){
    let productExistInCart: IProduct | undefined;
      if(this.cartList){
        productExistInCart = this.cartList.find(e=> {
          return e.id === product.id;
        });
      }

      if (!productExistInCart) {
        this.cartList?.push({...product, quantity: 1});
        return;
      }

      if(productExistInCart.quantity){
        productExistInCart.quantity += 1;
      }

    this.cartData.next(this.cartList);
  }

  getLoggedUser(): IUser{
    return JSON.parse(localStorage.getItem('prod:user') as string);
  }

}
