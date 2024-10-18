import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { Icategory } from '../../models/icategory';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../CustomDirectives/highlight.directive';
import { FormsModule } from '@angular/forms';
import { immediateProvider } from 'rxjs/internal/scheduler/immediateProvider';
import { combineLatest } from 'rxjs';
import { StaticProductsService } from '../../services/static-products.service';
import { Router, RouterLink } from '@angular/router';
import { ApiProductsService } from '../../services/api-products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , HighlightDirective , FormsModule , RouterLink ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnChanges , AfterViewInit , OnInit {

products : Iproduct[] =[] as Iproduct[] ;
categories : Icategory[] = [];
totalprice : number = 0;
quantity :number = 0;
// define event
@Output() onTotalPriceChanges : EventEmitter<number> ;

@Input() categoryID :number = 0 ;
newProducts :Iproduct[] ;

// view child
@ViewChild('userName') myInput !: ElementRef<any> ;
usernamevalue : string = '';


constructor(private productservice: StaticProductsService ,private router : Router , private _ApiProductsService : ApiProductsService){

    this.newProducts = this.products;

    this.onTotalPriceChanges = new EventEmitter<number>();

}
  ngOnInit(): void {
   this._ApiProductsService.getAllProducts().subscribe({
    next:(res)=>{
      this.products=res;
      this.newProducts = this.products;
    },
    error:(err)=>
    {
        console.log(err);

    }
   })
  }
  ngAfterViewInit(): void {
   // this.save();
    this.myInput.nativeElement.value = 'abdalla';

    // take a object inastance and see in parant from child

  }


 ngOnChanges() {
     // this.getFilteredProducts();
     //use serice filter
     this._ApiProductsService.getProductByCatId(this.categoryID).subscribe({
        next:(res)=>{
          this.newProducts = res;
        }
      })

     // this.save(this.usernamevalue);
  }



 // Method to handle the buy button click
 Buy(countInput: string, price: number, product: Iproduct): void {
  const quantity = +countInput; // Convert input to a number

  if (quantity > 0 && product.Quantity >= quantity) {
    this.totalprice += quantity * price; // Calculate total price
    product.Quantity -= quantity; // Update the product's quantity
    countInput = " " ;
  }
  //  else {
  //   alert('Invalid quantity or out of  stock');
  // }

  // Fire event + send the data i want to send to parant componant
  this.onTotalPriceChanges.emit(this.totalprice);
}

// getFilteredProducts() {
//   if (this.categoryID == 0) {
//      this.newProducts = this.products
//   }
//  else {
//     this.newProducts =this.products.filter(product => product.catId == this.categoryID);
//   }
// }


 save()
 {
    this.usernamevalue;
}

Details(id : number) {

    //this.router.navigateByUrl(`/details/${id}`);
    this.router.navigate(['/details' , id]);


  }


}
