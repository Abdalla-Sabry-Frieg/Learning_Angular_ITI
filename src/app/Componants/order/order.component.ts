import { AfterViewInit, Component, OnChanges, Output, output, SimpleChanges, ViewChild } from '@angular/core';
import { Icategory } from '../../models/icategory';
import { ProductsComponent } from "../products/products.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../models/iproduct';
import { StaticProductsService } from '../../services/static-products.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ProductsComponent , CommonModule , FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent   {


categories : Icategory[] = [];
@Output() selectedCatId :number =0 ;

products : Iproduct[];
RecivedTotalPrice:number =0;

// view child

@ViewChild(ProductsComponent) prod_ComponantsObj !: ProductsComponent ;

constructor(private productService : StaticProductsService)
  {
    this.categories = [
      { id: 1, name: 'category 1'} ,
      { id: 2, name: 'category 2'} ,
      { id: 3, name: 'category 3'} ,
      { id: 4, name: 'category 4'} ,
    ]

   this.products = this.productService.getAllProducts();

  }
  // ngAfterViewInit(): void {
  //  console.log(this.prod_ComponantsObj.products)
  // }

  R_calculateTotalPrice(RecivedTotalPriceFromEmitter : number)
  {
      this.RecivedTotalPrice = RecivedTotalPriceFromEmitter ;
  }



}
