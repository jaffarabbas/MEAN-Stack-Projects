import { CanActivateFn } from '@angular/router';

export const isUserLoggedIdGuard: CanActivateFn = (route, state) => {
  return true;
};
