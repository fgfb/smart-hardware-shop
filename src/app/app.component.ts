import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AmendProductsComponent } from './modules/landing-page/components/amend-products/amend-products.component';
import { ApiService } from './services/api.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private dialog: MatDialog,
    private router: Router) {}
  
  ngOnInit(): void {
  }

  isLoggedIn(): boolean{
    return this.apiService.isUserLoggedIn();
  }

  isAdmin(): boolean{
    return (this.stateService.getLoggedUser()?.role === 'ADMIN');
  }

  viewCart(){
    this.router.navigate(['/cart']);
  }

  openAmendProductDialog(){
    const dialogRef = this.dialog.open(AmendProductsComponent, {
      width: '600px',
      maxHeight: '800px'
    });
  }

  logout(){
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
