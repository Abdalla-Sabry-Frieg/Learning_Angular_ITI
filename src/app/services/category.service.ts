import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icategory } from '../models/icategory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclint : HttpClient) {

  }

  getCategories(): Observable<Icategory[]> {
    return this.httpclint.get<Icategory[]>(`${environment.baseURL}/categories`);
  }
  
}
