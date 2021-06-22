
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private urlEndPoint: string = 'https://sistemagestionventas.herokuapp.com';
  constructor(private http: HttpClient, private cookies: CookieService) {
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

    //return this.http.post('https://reqres.in/api/login', user);
  }

  logout(){
    
    sessionStorage.clear();
  }

  setToken(token: string) {
     sessionStorage.setItem('token',token)
  }
  getToken() {
       return sessionStorage.getItem('token')
  }

}
