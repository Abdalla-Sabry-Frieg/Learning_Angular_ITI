import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VisionComponent } from '../vision/vision.component';
import { ValuesComponent } from '../values/values.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterOutlet , RouterLink],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUSComponent {

}
