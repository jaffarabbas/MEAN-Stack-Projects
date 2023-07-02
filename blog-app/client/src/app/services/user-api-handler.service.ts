import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../model/user';
import { ApiUrls } from '../utils/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class UserApiHandlerService {

  constructor(private userService:UserService) { }

  async login(user:User) {
    let {email , password} = user;
    const userData = await this.userService.create(user,ApiUrls.API_ENDPOINTS.user.login).toPromise();
    if(userData){
      localStorage.setItem('userToken',JSON.stringify(userData));
      return true;
    }
    return false;
  }
}
