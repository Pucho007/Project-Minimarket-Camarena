import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string;
  password: string;

  @ViewChild('load', { static: true }) load: TemplateRef<any>;

  constructor(private authService: AuthService, public router: Router,config: NgbModalConfig,private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered=true;
    config.backdropClass='mod'
  }
  modload:NgbModalRef;
  ngOnInit(): void {
    if (this.authService.token) {
      this.router.navigateByUrl('dashboard');
    }
  }

  login() {
    let user: User = new User();
    user.username = this.usuario;
    user.password = this.password;

    if (user.username == undefined || user.password == undefined) {
      Swal.fire('Error login', 'Usuario o contraseña vacias!', 'error');
      return;
    }
    this.modload=this.modalService.open(this.load,{size:'lg'});
    this.authService.login(user).subscribe(
      (response) => {
        this.authService.guardarToken(response.access_token);
        this.authService.guardarUsuario(response.access_token);
        this.modload.close()
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.modload.close()
        if (err.status == 400 || err.status == 401 || err.status == 500) {
          Swal.fire('Error Login', `${err.error.error_description}`, 'error');
        }
      }
    );
  }
}
