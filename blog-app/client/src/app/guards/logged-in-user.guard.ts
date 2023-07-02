import { CanActivateFn } from '@angular/router';

export const loggedInUserGuard: CanActivateFn = (route, state) => {
  return true;
};
