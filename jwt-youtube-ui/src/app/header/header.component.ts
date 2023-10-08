import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private router :Router,private userauthservice:UserAuthService,public userService:UserService){}
ngOnInit(){
  const role=this.userauthservice.getRoles()
 // console.log(role);
 const token=this.userauthservice.getToken()
 //console.log(token);
  //console.log(this.userService.roleMatch('Admin'))
}
IsLoggedIn(){
  return this.userauthservice.isLoggedIn();}
  logout(){
    this.userauthservice.clear();
    this.router.navigate(['/home']);
  }
  public isAdmin(){
    return this.userauthservice.isAdmin();}

}
