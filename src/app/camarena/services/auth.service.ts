
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private urlEndPoint: string = environment.url;
  private _usuario: User;
  private _token: string;
  constructor(private http: HttpClient,private router: Router) {
  }

  login(user: User): Observable<any> {

    const urlEndpoint = `${this.urlEndPoint}/oauth/token`;

    const credenciales = btoa('sistemagestionventas' + ':' + 'xkisnniduhw');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }


  public get usuario(): User{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario')!= null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as User;
      return this._usuario;
    }
    return new User();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token')!= null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
    
  }

  guardarToken(accesstoken: string):void{
    let payload = this.obtenerDatosToken(accesstoken);
    this._usuario = new User();
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this._usuario.nombre=payload.nombre
    this._usuario.apellido=payload.apellido
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }

  guardarUsuario(accesstoken: string):void{
    this._token = accesstoken;
    sessionStorage.setItem('token',accesstoken);

  }

  obtenerDatosToken(accesstoken: string): any{
    if(accesstoken != null){
      return JSON.parse(atob(accesstoken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }

  logout(): void{
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
  }

  isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.isAuthenticated()) {
        this.logout();
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


}
