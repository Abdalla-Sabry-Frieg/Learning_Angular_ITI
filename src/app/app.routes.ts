import { Routes } from '@angular/router';
import { HomeComponent } from './Componants/home/home.component';
import { ProductsComponent } from './Componants/products/products.component';
import { ContactUSComponent } from './Componants/contact-us/contact-us.component';
import { NotFoundComponent } from './Componants/not-found/not-found.component';
import { VisionComponent } from './Componants/vision/vision.component';
import { ValuesComponent } from './Componants/values/values.component';
import { ProductDetailsComponent } from './Componants/product-details/product-details.component';
import { OrderComponent } from './Componants/order/order.component';
import { LoginComponent } from './Componants/login/login.component';
import { authGuard } from '../guards/auth.guard';
import { AddProductComponent } from './Componants/add-product/add-product.component';
import { RegisterComponent } from './Componants/register/register.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty path to home
  { path: 'home', component: HomeComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'products', // to can turn on lazy loading
    loadComponent:()=>import('./Componants/products/products.component').then((obj)=> obj.ProductsComponent) },
  { path: 'products/:id', component: ProductDetailsComponent },
  // Route to create a new product (without product ID)
  { path: 'addproducts/add', component: AddProductComponent },
  // Route to edit a product (with product ID)
  { path: 'addproducts/edit/:id', component: AddProductComponent },

  { path: 'order', component: OrderComponent , canActivate:[authGuard]}, // to create guard on order page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path : 'details/:id' ,component : ProductDetailsComponent},
  {
    path: 'ContactUS',
    component: ContactUSComponent,  // Corrected component reference
    children: [
      { path: '', component: VisionComponent},
      { path: 'vision', component: VisionComponent },
      { path: 'values', component: ValuesComponent },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Wildcard route for 404 page

];
