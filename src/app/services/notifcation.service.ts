import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifcationService {

  notifications: string[] =[];

  constructor() {
      this.notifications = [
        'notification 1 ' ,
        'notification 2 ' ,
          '',
        'notification 3 ' ,
      ];

   }

   GetNotifcation() : Observable<string> {
      return new Observable ((observable) => {
        // next , error ,complete
        let counter = 0 ;
         let setIntervalNotfication = setInterval(() => {
          if (counter == this.notifications.length){
            observable.complete();
          }
          if(this.notifications[counter] == ""){ 
            observable.error('this msg is empty');
          }
          observable.next(this.notifications[counter])
          counter++ ;
        } , 1500);

        return{
          unsubscribe : ()=>{
            clearInterval(setIntervalNotfication);
          }
        }
      });
   };


}
