import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ICart } from 'src/app/interfaces/cart';
import { IProduct } from 'src/app/interfaces/product';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: ICart | undefined;

  completeProductList: ICompleteProduct[] = [];

  displayedColumns: string[] = ['product', 'quantity', 'price'];

  dataSource = new MatTableDataSource<ICompleteProduct>();

  constructor(
    private apiService: ApiService,
    private stateService: StateService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  async getCartItems(){
    let userId = this.stateService.getLoggedUser()?.id;
    if(userId){
      const source = this.apiService.getCartForUser(userId);
      this.cartList = await lastValueFrom(source);
      this.getCompleteProductDetailsToCart();
    }
  }

  getCompleteProductDetailsToCart(){

    this.completeProductList = this.stateService.cartList?.map(cartItem =>{
      const matchItem = this.cartList?.products.find(cartListItem => cartListItem.id === cartItem.id);
      if(matchItem){
        return {product: cartItem, quantity: matchItem.quantity + 1, totalPrice: cartItem.price * (matchItem.quantity + 1)};
      } else if(cartItem.quantity){
        return {product: cartItem, quantity: cartItem.quantity, totalPrice: cartItem.price * cartItem.quantity }
      } else{
        return {product: cartItem, quantity: 1, totalPrice: cartItem.price }
      }
    });

    if(this.cartList){

      for(let cartProduct of this.cartList.products){
        this.apiService.getProductById(cartProduct.id).subscribe({
          next: (product) => {
            let completeProduct = {
              product: product,
              quantity: cartProduct.quantity,
              totalPrice: cartProduct.quantity * product.price
            }
            this.completeProductList.push(completeProduct);
            this.dataSource = new MatTableDataSource(this.completeProductList);
          },
          error: (err) => console.error(err)
        });
      }
    }
  }

  getTotalCost() {
    if(this.completeProductList){
      return this.completeProductList.map(p => p.totalPrice).reduce((acc, value) => acc + value, 0);
    } else {
      return null;
    }
  }

}

export interface ICompleteProduct{
  product: IProduct,
  quantity: number,
  totalPrice: number
}
