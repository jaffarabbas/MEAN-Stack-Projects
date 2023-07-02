import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { User } from 'src/app/model/user';
import { UserApiHandlerService } from 'src/app/services/user-api-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,public userApiHandler:UserApiHandlerService,private route:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Perform login logic here
    if (this.loginForm.valid) {
     // @ts-ignore
     let user:User = {
       email : this.loginForm.value.email,
       password : this.loginForm.value.password
     }
     this.userApiHandler.login(user).then((data)=>{
        if(data){
          alert('Login Successfull');
          this.route.navigate(['/']);
        }else{
          alert('Login Failed');
        }
     });
    }
  }
}
