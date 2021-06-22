import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    
  }
   
  login(){
    if(this.usuario==null||this.password==null){
      Swal.fire('Error login', 'Usuario o contraseña vacias!', 'error');
      return;
    }
    let user:User=new User();
    user.username=this.usuario
    user.password=this.password
    this.authService.login(user).subscribe(response =>{      

      this.authService.guardarToken(response.access_token);
      this.authService.guardarUsuario(response.access_token);
      this.router.navigate(['/dashboard']);
    }, err => {
      if(err.status == 400 || err.status == 401 ||err.status == 500){
        Swal.fire('Error Login', `${err.error.error_description}`, 'error')
      }
    }
    );
  }


}
