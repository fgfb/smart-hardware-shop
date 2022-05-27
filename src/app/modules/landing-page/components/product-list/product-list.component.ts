import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IProductQuantity } from 'src/app/interfaces/product';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { AmendProductsComponent } from '../amend-products/amend-products.component';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchTerm: string = '';

  productList: IProduct[] = [];

  cartProductList: IProductQuantity[] = [];

  isLoading: boolean = false

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,
    private stateService: StateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
    });

    this.apiService.getProductsByKeyword(this.searchTerm).subscribe({
      next: (product) => {
        this.isLoading = true;
        this.productList = product;
        if(this.productList?.length){
          this.isLoading = false;
        }
      },
      error: (e) => console.error(e)
    });
  }

  addToCart(product: IProduct){
    this.stateService.addCartData(product);
    this.openSnackbar(product);
  }

  openSnackbar(product: IProduct){
    let productName  = product.name;

    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: productName
    });
  }

  editProduct(product: IProduct){
    const dialogRef = this.dialog.open(AmendProductsComponent, {
      width: '600px',
      maxHeight: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  isAdmin(): boolean{
    return this.stateService.getLoggedUser()?.role === 'ADMIN'
  }

}
