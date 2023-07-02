import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiHandlerService } from 'src/app/services/user-api-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,public userApiHandler:UserApiHandlerService,private route:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Perform login logic here
    if (this.registerForm.valid) {
     // @ts-ignore
     let user:User = {
       email : this.registerForm.value.email,
       password : this.registerForm.value.password
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
