import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  searchForm = new FormGroup({
    query: new FormControl('', Validators.required)
  });

  recommendedProducts: IProduct[] = [];

  products: Observable<IProduct[]> | undefined;

  searchText: string | undefined;

  isSubmitted: boolean = false;

  constructor(private apiService: ApiService,
    private router: Router,
    private stateService: StateService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.products = this.searchForm.get('query')?.valueChanges.pipe(
      debounceTime(500),
      switchMap(key => this.apiService.getProductsByKeyword(key))
    );

    this.fetchRecomendedProducts();
  }

  fetchRecomendedProducts(){
    this.apiService.getRecommendedProducts().subscribe({
      next: (product) => {
        this.recommendedProducts = product;
      },
      error: (e) => console.error(e)
    });
  }

  submit() {
    this.isSubmitted = true;
    if(this.searchForm.get('query')?.value){
      this.router.navigate(['/products'], { queryParams: {q: this.searchForm.get('query')?.value}});
    }
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

}
