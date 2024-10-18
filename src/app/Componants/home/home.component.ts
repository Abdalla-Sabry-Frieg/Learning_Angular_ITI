import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotifcationService } from '../../services/notifcation.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { decreaseCounter, increaseCounter } from '../../store/counter/counter.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy
{

  // to stop push notification in componant when leave current componant
  subscribtion !:Subscription;

  // to user the store
  counter :Observable<number>;
  count  : number = 0;


  constructor(private notificationservices : NotifcationService , private store:Store<{counter:number}>)
    {
        this.counter = this.store.select("counter"); // counter : is the name in app.config

        this.counter.subscribe((res)=>{
          this.count= res;
        })
    }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
  ngOnInit(): void {
    // 1- way
    // this.notificationservices.GetNotifcation().subscribe((notification)=>{
    //     console.log(notification);

    // },(error)=>{
    //   console.log(`-------------------------${error}------------------------`);
    // })

    // 2-way
     this.subscribtion = this.notificationservices.GetNotifcation().subscribe({
      next:(notification) =>{
        console.log(notification);
      },
      error : (error)=>{
        console.log(error);
      },
      complete: ()=>{
        console.log('notification completed sucssesfuly');

      }

    })
  }

  increasCounterValue(){
    this.store.dispatch(increaseCounter()) // increaseCounter : is the name of action in store.actions
  }

  decreaseCounterValue(){
    this.store.dispatch(decreaseCounter()) // increaseCounter : is the name of action in store.actions
  }

}
