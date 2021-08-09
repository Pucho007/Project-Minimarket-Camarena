import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlEndPoint: string = environment.url;
  private httpHeader = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  
  public agregarAutorizacion() {
    let tok = this.auth.token;
    if (tok != null) {
      return this.httpHeader.append('Authorization', 'Bearer' + tok);
    }
    return this.httpHeader;
  }

  listarusuario(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.urlEndPoint}/sgv/listar_usuarios`, {
        headers: this.agregarAutorizacion(),
      })
      .pipe(
        catchError((e) => {
          this.auth.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }

  buscar(username): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.urlEndPoint}/sgv/buscarUsuarioPorId?username=${username}`, {
        headers: this.agregarAutorizacion(),
      })
      .pipe(
        catchError((e) => {
          this.auth.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }
  save(usuario): Observable<Usuario>{
    
    return this.http.post<Usuario>(this.urlEndPoint+'/sgv/insertarusuario',usuario,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  actualizar(usuario): Observable<Usuario>{
    
    return this.http.post<Usuario>(this.urlEndPoint+'/sgv/actualizarUsuario',usuario,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  eliminar(usuario): Observable<Usuario>{
    
    return this.http.post<Usuario>(this.urlEndPoint+'/sgv/eliminarUsuario?username='+usuario,null,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }
}
