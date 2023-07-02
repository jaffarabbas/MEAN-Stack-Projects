import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../model/blogs';
import { ApiService } from './api.service';
import { ApiUrls } from '../utils/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class BlogsService extends ApiService<Blog>  {

  constructor(http:HttpClient) {
    super(http);
    this.apiUrl = ApiUrls.API_URL;
    this.apiController = ApiUrls.API_CONTROLLERS.blogs;
  }
}
