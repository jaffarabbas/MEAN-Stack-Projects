import { Component, OnInit } from '@angular/core';
import { UserApiHandlerService } from 'src/app/services/user-api-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  user:any;
  constructor(public userServiceApiHandler:UserApiHandlerService) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser(){
    console.log("getLoggedInUser");
    this.userServiceApiHandler.getLogedUser().then((data)=>{
      // @ts-ignore
      this.user = this.userServiceApiHandler.loggedUser['user'];
    });
  }
}
