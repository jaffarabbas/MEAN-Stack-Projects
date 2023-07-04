import { Component, Input } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserApiHandlerService } from 'src/app/services/user-api-handler.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() user!:any;

  constructor(private userApiHandler:UserApiHandlerService) { }

  logOut(){
    this.userApiHandler.logout().then(()=>{
      alert('Logout Successfull');
    });
  }
}
