import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../app/services/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  console.log(route , state);

  // inject service in function by using inject keyword
  let userLogged = inject(UserAuthService);

  let router = inject(Router)

  if(userLogged.getUserLogged())
  {
    return true;
  }else{
    router.navigateByUrl('/login');
    return false;
  }
};

