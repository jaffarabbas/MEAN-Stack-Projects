import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../model/user';
import { ApiUrls } from '../utils/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class UserApiHandlerService {
  loggedUser!:User;
  constructor(private userService:UserService) { }

  async login(user:User) {
    const userData = await this.userService.create(user,ApiUrls.API_ENDPOINTS.user.login).toPromise();
    if(userData){
      // @ts-ignore
      localStorage.setItem('userToken',JSON.stringify(userData['token']));
      return true;
    }
    return false;
  }

  async regsiter(user:User) {
    const userData = await this.userService.create(user,ApiUrls.API_ENDPOINTS.user.register).toPromise();
    if(userData){
      // @ts-ignore
      localStorage.setItem('userToken',JSON.stringify(userData['token']));
      return true;
    }
    return false;
  }

  async getLogedUser(){
    console.log("getLogedUser");
    const token = localStorage.getItem('userToken');
    console.log(token);
    const userData = await this.userService._getOne(ApiUrls.API_ENDPOINTS.user.loggedUser,token).toPromise();
    if(userData){
      this.loggedUser = userData;
    }
  }
}
