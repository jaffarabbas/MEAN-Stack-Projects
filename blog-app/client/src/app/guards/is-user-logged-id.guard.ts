import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';


export const isUserLoggedIdGuard: CanActivateFn = (route, state) => {
  let localStorage = new LocalStorageService();
  let router = new Router();
  let token = localStorage.getItem('userToken');
  console.log(token);
  if (token != null) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
