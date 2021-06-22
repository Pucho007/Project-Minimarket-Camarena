import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario:string;
  password:string;

  constructor(private authService:AuthService, public router: Router){}

  ngOnInit(): void {
    if(this.authService.getToken()){
      this.router.navigateByUrl("dashboard")
    }
  }
   
  login(){
    const user:User={
      username:this.usuario,
      password:this.password,
    }

    this.authService.login(user).subscribe(data=>{
      this.authService.setToken(data.token);
      this.router.navigateByUrl("dashboard");
    }, error=>{
      console.log(error);
      console.log("no entrar");
    })
  }


}
