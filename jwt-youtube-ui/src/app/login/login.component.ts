import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userservice:UserService,private userauthservice:UserAuthService,private router:Router){}
  login(loginForm:NgForm){
this.userservice.login(loginForm.value).subscribe((response:any)=>{
  console.log(response);
  this.userauthservice.setToken(response.jwtToken);
  this.userauthservice.setRoles(response.user.role);
  const role = response.user.role[0].roleName;
 // console.log(role);
  if(role === 'Admin'){
this.router.navigate(['/admin']);
  }
  else {
    this.router.navigate(['/user']);
  }

},(error)=>{
  console.log(error);
}
)

  }

}
