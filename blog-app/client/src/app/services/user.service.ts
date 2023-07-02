import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../utils/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User>  {

  constructor(http:HttpClient) {
    super(http);
    this.apiUrl = ApiUrls.API_URL;
    this.apiController = ApiUrls.API_CONTROLLERS.user;
  }
}
