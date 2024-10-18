import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { environment } from '../../environments/environment.development';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  constructor(private httpClient : HttpClient , private userService : UserAuthService) { }

  // any componant need this mehod can subscribe and use it
  getAllProducts () : Observable<Iproduct[]>{
    return this.httpClient.get<Iproduct[]>(`${environment.baseURL}/products`
      // {
      //   // send data with get method by headers and insert mt data i need it to in get
      //   headers : new HttpHeaders({
      //       "authorization" :this.userService.getToken()
      //   })
      // });
  )}

  getProductById (id:number) : Observable<Iproduct>{
    return this.httpClient.get<Iproduct>(`${environment.baseURL}/products/${id}`)
  }

  // if i need to seraech using any element using a query string
  getProductByCatId (catid:number) : Observable<Iproduct[]>{
    // to send more thane one data in params like a query sring and limit of dosplay products
    let searchString = new HttpParams();
      searchString = searchString.append("catid" , catid); // key , value
      searchString = searchString.append("limit" , 5) // to make limit 5 poducts to view

   // return this.httpClient.get<Iproduct[]>(`${environment.baseURL}/products?catid=${catid}`)

      return this.httpClient.get<Iproduct[]>(`${environment.baseURL}/products` , {
      // send all data in one params
        params : searchString
      });
  }

  addProduct(newProduct:Iproduct):Observable<Iproduct>{
    return this.httpClient.post<Iproduct>(`${environment.baseURL}/products` , JSON.stringify(newProduct));
  }

  updateProduct(product: Iproduct): Observable<void> {
   // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<void>(`${environment.baseURL}/products/${product.id}`, JSON.stringify(product));
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseURL}/products/${id}`);
  }

}
