import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class StaticProductsService {

  products : Iproduct[];

  constructor() {

    this.products = [
      { id: 1, name: 'Product 1', description: 'Description for product 1', price: 100, imageUrl: '/assets/images/fruite-item-5.jpg'  , catId :1 , Quantity : 5} ,
      { id: 2, name: 'Product 3', description: 'Description for product 2', price: 150, imageUrl: '/assets/images/banner-fruits.jpg' , catId :1 , Quantity : 3},
      { id: 3, name: 'Product 4', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/best-product-1.jpg' , catId :1, Quantity : 5},
      { id: 4, name: 'Product 5', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/best-product-3.jpg' , catId :2 , Quantity : 5},
      { id: 4, name: 'Product 5', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/best-product-3.jpg' , catId :2 , Quantity : 2},
      { id: 5, name: 'Product 6', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/best-product-4.jpg'  , catId :2 , Quantity : 5},
      { id: 6, name: 'Product 7', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/best-product-5.jpg' , catId :2 , Quantity : 2},
      { id: 7, name: 'Product 8', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/best-product-6.jpg'  , catId :3, Quantity : 6},
      { id: 8, name: 'Product 9', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/featur-1.jpg' , catId :3 , Quantity : 5},
      { id: 9, name: 'Product 2', description: 'Description for product 2', price: 150, imageUrl: ' /assets/images/vegetable-item-2.jpg' , catId :4 , Quantity : 1},
      { id: 10, name: 'Product 10', description: 'Description for product 10', price: 200, imageUrl: ' /assets/images/vegetable-item-5.jpg' , catId :4, Quantity : 5 }
    ];


   }

   getAllProducts (){
    return this.products;
   }

   getProductfindById (id : number) : Iproduct | null {
    let founded= this.products.find((x)=>x.id == id) ;
    return founded ? founded : null ;
   }

   getProductfindByCatId (catId : number) : Iproduct[] {
    if(catId == 0)
    {
      return this.getAllProducts();
    }
    else
    {
      return this.products.filter(x=>x.catId == catId);
    }
   }

   // create new array of Ids
   mapProductsToId () : number[]{
      return this.products.map((x) => x.id);
   }
}
