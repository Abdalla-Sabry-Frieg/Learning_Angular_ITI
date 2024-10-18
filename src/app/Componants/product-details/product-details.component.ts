import { AfterViewInit, Component, OnChanges, OnInit, Pipe, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticProductsService } from '../../services/static-products.service';
import { Iproduct } from '../../models/iproduct';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { ApiProductsService } from '../../services/api-products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe , CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit  , AfterViewInit {

  currentId : number =0 ;
  //product : Iproduct = {} as Iproduct ;
  product : Iproduct | null = null  ;
  totalPrice: number =0;
  quantity : number =0 ;
  price :number = 0;
  products : Iproduct[] = [];

constructor(private activeRoute : ActivatedRoute , private productSevice : StaticProductsService ,
  private router: Router , private location : Location , private _ApiProductsService : ApiProductsService){

    this.products = productSevice.getAllProducts();
   // this.product = this.productSevice.getProductfindById(this.currentId)
}
ngAfterViewInit(): void {
       // This will be called after the view has been fully initialized
      //this.products = this.productSevice.getAllProducts();

      this._ApiProductsService.getAllProducts().subscribe({
        next:(res)=>{
          this.products=res;
        },
        error:(err)=>
        {
            console.log(err);

        }
       })

      // this._ApiProductsService.getProductById(this.currentId).subscribe({
      //   next:(res)=>{
      //     this.product=res;
      //   },
      //   error:(err)=>{
      //     console.log(err);

      //   }
      //  })

  }

  // ngOnChanges(): void {
  //   this.products = this.productSevice.getAllProducts();
  //   this.product = this.productSevice.getProductfindById(this.currentId);
  //   console.log(`${this.product?.id}`);

  // }
  ngOnInit(): void {
    // when navegate page not reload

    // this.currentId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    // this.product= this.productSevice.getProductfindById(this.currentId)!;

    //  use subscrib to reload page with new id and reload new product id
      this.activeRoute.paramMap.subscribe((paramMap) => {
      const  id = Number(paramMap.get('id'));
        this.currentId = id ;

       this._ApiProductsService.getProductById(this.currentId).subscribe({
        next:(res)=>{
          this.product=res;
        },
        error:(err)=>{
          console.log(err);

        }
       })

      });
     // console.log(`${this.product?.id}`);
      console.log(`${this.currentId}`);




  }

    buyProduct(quantity : string ) :void  {

      if (   this.product?.Quantity != null && this.price !== undefined && this.product.Quantity >= +quantity) {
          this.totalPrice += +quantity! * this.product.price! ;
          this.product.Quantity -= +quantity;

      }
      else
      {
        alert('not posible');
      }
  }

  goBack() {
     this.router.navigate(['/products']);
    // this.location.back()
  }

  pervoius() {
     // let idFromMap = this.productSevice.mapProductsToId();
    // let currentIdIndex = idFromMap.findIndex((x)=>x == this.currentId);  // find the index of current id
    // this.router.navigateByUrl(/details/${idFromMap[currentIdIndex - 1]});

    if (this.currentId > 1) {
      this.router.navigate([`/details/${this.currentId - 1}`]);
    } else {
      alert('No previous product available');
    }
  }

  next() {
    // let idFromMap = this.productSevice.mapProductsToId();
      // let currentIdIndex = idFromMap.findIndex((x)=>x == this.currentId);  // find the index of current id
      //this.router.navigateByUrl(/details/${idFromMap[currentIdIndex + 1]});

      const maxId = this.products.length;
      if (this.currentId < maxId) {
        this.router.navigate([`/details/${this.currentId + 1}`]);
      } else {
        alert('No next product available');
      }
    }
  }

