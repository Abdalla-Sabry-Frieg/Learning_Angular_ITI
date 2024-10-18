import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { tick } from '@angular/core/testing';
import { languageAction } from '../../store/counter/language/language.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , CommonModule , AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    isUserLooged !: boolean ;
    currentLang$ : Observable<string>;
    currentLang !: string;

  constructor(private userAuthService : UserAuthService , private store : Store<{language:string}>){
    this.currentLang$ = this.store.select('language');

    // this.currentLang$.subscribe((res)=>{
    //   this.currentLang = res;
   // })
  }
  // when the componant reload
  ngOnInit(): void {
   // this.isUserLooged = this.userAuthService.getUserLogged();

   this.userAuthService.getAuthSubject().subscribe({
    next : (statuse) =>
      this.isUserLooged=statuse
   })
  }

  changeLanguage(){
    this.currentLang$.subscribe((currentLang) => {
      this.store.dispatch(languageAction({lang:(this.currentLang == "en")? 'ar' : 'en'}));
  });
}

}
