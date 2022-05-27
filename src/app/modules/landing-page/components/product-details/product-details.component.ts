import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { AmendProductsComponent } from '../amend-products/amend-products.component';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId: number | undefined;

  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private stateService: StateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.productId = Number(id);
    });

    this.apiService.getAllProducts().subscribe({
      next: (products) => {
        this.product = products.find(p => {
          return p.id === this.productId;
        });
      },
      error: (err) => console.error(err)
    });
  }

  editProduct(){
    const dialogRef = this.dialog.open(AmendProductsComponent, {
      width: '600px',
      maxHeight: '800px',
      data: this.product
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProductDetails();
    });
  }

  addToCart(product:any){
    this.stateService.addCartData(product as IProduct);
    this.openSnackbar(product as IProduct);
  }

  openSnackbar(product: IProduct){
    let productName  = product.name;

    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: productName
    });
  }

  isAdmin(): boolean{
    return (this.stateService.getLoggedUser()?.role === 'ADMIN');
  }

}
