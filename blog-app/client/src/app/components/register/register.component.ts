import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      tc: ['true', Validators.required]
    });
  }

  onSubmit() {
    // Perform login logic here
    if (this.registerForm.valid) {
     // @ts-ignore
     let user : User = {
        name:this.registerForm.value.name,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
        tc:this.registerForm.value.tc
     };
     if(user.password == this.registerForm.value.password_confirmation){
      let data_with_confirm_password = {
        ...user,
        password_confirmation:this.registerForm.value.password
       };
       this.userApiHandler.regsiter(data_with_confirm_password).then((res)=>{
        if(res){
          alert('Register Successfull');
          this.route.navigate(['/']);
        }else{
          alert('Register Failed');
        }
        }).catch((err)=>{
          alert('Register Failed');
        });
     }else{
        alert('Password and Confirm Password not matched');
        return;
     }
    
    }
  }
}
