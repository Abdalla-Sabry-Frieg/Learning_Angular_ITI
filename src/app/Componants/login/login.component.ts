import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isUserLogged : boolean  ;
  counter : Observable<number> ;
  constructor(private userService : UserAuthService ,private store : Store<{counter:number}>){
    this.isUserLogged = userService.getUserLogged();
    this.counter = this.store.select("counter");
  }

  login(){
    this.userService.login();
    this.isUserLogged = this.userService.getUserLogged();
  }
  logout(){
    this.userService.logout();
    this.isUserLogged = this.userService.getUserLogged();

  }
}
