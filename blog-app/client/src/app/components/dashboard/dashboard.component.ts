import { Component, OnInit } from '@angular/core';
import { UserApiHandlerService } from 'src/app/services/user-api-handler.service';
import {MatDialog} from "@angular/material/dialog";
import { CreateBlogsComponent } from '../shared/create-blogs/create-blogs.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  user:any;
  constructor(public userServiceApiHandler:UserApiHandlerService,public dialog: MatDialog) { }

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

  openDialog(){
    const dialogRef = this.dialog.open(CreateBlogsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
