import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: ()=> import('./modules/login/login.module').then(m => m.LoginModule)
  },
  // {
  //   path: 'cart',
  //   loadChildren: ()=> import('./modules/cart/cart.module').then(m => m.CartModule),
  //   canActivate: [AuthGuardService]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
