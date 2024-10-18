import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Componants/navbar/navbar.component';
import { FooterComponent } from './Componants/footer/footer.component';
import { SidebarComponent } from './Componants/sidebar/sidebar.component';
import { ProductsComponent } from "./Componants/products/products.component";
import { OrderComponent } from "./Componants/order/order.component";
import { VisionComponent } from './Componants/vision/vision.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SidebarComponent, ProductsComponent,
              OrderComponent , VisionComponent , AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'labDay2';
  language$ : Observable<string>;
  dir : string = "ltr";

  constructor(private store : Store<{language:string}>){
    this.language$=this.store.select("language");

    this.language$.subscribe((lang)=>{
      this.dir =(lang == "en")? 'ltr' : 'rtl';
    })
  }
}
