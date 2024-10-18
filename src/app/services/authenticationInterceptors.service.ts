import { HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


export function  authenticationIntercertors(req:HttpRequest<any> , next :HttpHandlerFn){
  //  console.log(req);
  let modifiedReq =req;
  if (req.method=="POST")
  {
    modifiedReq=req.clone({
      headers: req.headers.append("lan" , "En")
    })
  }

  // must calling at end to next
     return next(modifiedReq).pipe(
      tap((event)=>{
        if(event.type == HttpEventType.Response)
        {
          console.log(event);

            if(event.status == 200 )
            {

            }
            else
            {
              
            }
        }


      })
     );
  }
