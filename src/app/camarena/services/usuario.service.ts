import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { usuario } from '../interfaces/usuario';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlEndPoint: string = 'https://sistemagestionventas.herokuapp.com';
  private httpHeader = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.auth.isAuthenticated()) {
        this.auth.logout();
      }
      this.router.navigate(['/menuAll']);
      return true;
    }
    if (e.status == 403) {
      Swal.fire(
        'Acceso denegado',
        'No esta autorizado a este recurso',
        'warning'
      );
      this.router.navigate(['/menuAll']);
      return true;
    }
    return false;
  }

  public agregarAutorizacion() {
    let tok = this.auth.token;
    if (tok != null) {
      return this.httpHeader.append('Authorization', 'Bearer' + tok);
    }
    return this.httpHeader;
  }

  listarusuario(): Observable<usuario[]> {
    return this.http
      .get<usuario[]>(`${this.urlEndPoint}/sgv/listar_usuarios`, {
        headers: this.agregarAutorizacion(),
      })
      .pipe(
        catchError((e) => {
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }
}
