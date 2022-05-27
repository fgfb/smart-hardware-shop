import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, retry, Subject, throwError } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { IUser } from '../interfaces/user';
import { ICart } from '../interfaces/cart';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private stateService: StateService) { }

  private apiUrl = "http://localhost:8080";

  private readonly loading = new Subject<boolean>();

  get isLoading(): Observable<boolean>{
    return this.loading;
  }

  getAllProducts(): Observable<IProduct[]>{
    const route = this.apiUrl + '/products';
    return this.http.get<IProduct[]>(route).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  getRecommendedProducts(): Observable<IProduct[]> {
    const route = this.apiUrl + '/recommendeds';
    return this.http.get<IProduct[]>(route).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  getProductsByKeyword(keyword: string){
    if (!keyword) { return of([]); }
    const route = this.apiUrl + '/products?q=' + keyword;
    return this.http.get<IProduct[]>(route).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  getProductById(product_id: number):Observable<IProduct>{
    const route = this.apiUrl + '/products/' + product_id;
    return this.http.get<IProduct>(route).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  updateProductById(id: number, requestBody: any){
    const route = this.apiUrl + '/products/' + id;
    return this.http.put(route, requestBody).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  addNewProduct(requestBody: any){
    const route = this.apiUrl + '/products';
    return this.http.post(route, requestBody).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  getUsers(): Observable<IUser[]>{
    const route = this.apiUrl + '/users';
    return this.http.get<IUser[]>(route).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  getUserById(id: number): Observable<IUser>{
    const route = this.apiUrl + '/users/' + id;
    return this.http.get<IUser>(route).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  getCartForUser(user_id: number): Observable<ICart>{
    const route = this.apiUrl + '/carts/' + user_id;
    return this.http.get<ICart>(route).pipe(
      retry(3),
      catchError(err => this.handleError(err))
    );
  }

  isUserLoggedIn(){
    let user = this.stateService.getLoggedUser();
    return !!user;
  }

  logout(){
    localStorage.clear();
  }

  handleError(error: HttpErrorResponse){
    return throwError(() => new Error(error.toString()));
  }

}
