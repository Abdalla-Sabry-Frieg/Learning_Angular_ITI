import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../services/api-products.service';
import { Iproduct } from '../../models/iproduct';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Icategory } from '../../models/icategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , FormsModule , RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  product : Iproduct = {} as Iproduct  ;
  productForm : FormGroup;
  productId: number | null = null;
  categorys  : Icategory[] =[] as Icategory[];
  isSubmitted = false;

  constructor(private _ApiProductsService : ApiProductsService ,  private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute , private _categoryservice : CategoryService){

      this.productForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          price: ['', [Validators.required, Validators.min(0)]],
          Quantity: ['', [Validators.required, Validators.min(1)]],
          description: [''],
          imageUrl: [''],
          catid: ['', Validators.required],
      });


  }
  ngOnInit(): void {
    this._categoryservice.getCategories().subscribe({
      next:(res)=>{
        this.categorys = res ;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });

    // Check if we are in edit mode (product ID is present in the route)

    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      if(id)
      {
        this.productId = +id;
        this._ApiProductsService.getProductById(this.productId).subscribe({
          next:(res) =>{
            this.product=res;
            this.productForm.patchValue(this.product);  // Bind the response data to the form
          },
          error: (err) => {
            console.error('Error fetching product:', err);
          }
        });
      }
    })
  }

  // Handle form submission for both Add and Edit operations
  onSubmit(): void {

    if (this.productForm.valid) {
      const product: Iproduct = this.productForm.value;
        // Update the product if an ID is provided (Edit)
      if (this.productId) {
        product.id = this.productId;
        this._ApiProductsService.updateProduct(product).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
          // Add new product
        this._ApiProductsService.addProduct(product).subscribe({
          next: () => {
          // Navigate back to the product list after adding the new product
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }

        });
      }
    }else {
      console.log('Form is invalid');
      console.log(`${this.productForm.errors}`);
    }

  }

// Helper to access form controls in the template
get formControls() {
  return this.productForm.controls;
}

}
