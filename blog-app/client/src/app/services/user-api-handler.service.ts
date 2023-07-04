import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../model/user';
import { ApiUrls } from '../utils/apiUrls';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserApiHandlerService {
  loggedUser!:User;
  constructor(private userService:UserService,private localStrorageService:LocalStorageService,private router:Router) { }

  async login(user:User) {
    const userData = await this.userService.create(user,ApiUrls.API_ENDPOINTS.user.login).toPromise();
    if(userData){
      // @ts-ignore
      let token = userData['token'];
      console.log(token);
      this.localStrorageService.setItem('userToken',token);
      return true;
    }
    return false;
  }

  async regsiter(user:User) {
    const userData = await this.userService.create(user,ApiUrls.API_ENDPOINTS.user.register).toPromise();
    if(userData){
      console.log(userData);
      // @ts-ignore
      this.localStrorageService.setItem('userToken',userData['token']);

      console.log("getLogedUser");
      const token = this.localStrorageService.getItem('userToken');
      console.log(token);
      return true;
    }
    return false;
  }

  async getLogedUser(){
    console.log("getLogedUser");
    const token = this.localStrorageService.getItem('userToken');
    console.log(token);
    const userData = await this.userService._getOne(ApiUrls.API_ENDPOINTS.user.loggedUser,token).toPromise();
    if(userData){
      this.loggedUser = userData;
    }
  }

  async logout(){
    this.localStrorageService.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
