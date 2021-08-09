import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tarjeta } from '../interfaces/tarjeta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecargaService {

  private urlEndPoint: string = environment.url;
  private httpHeader = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  recarga(tarjeta:Tarjeta): Observable<Tarjeta>{
    
    return this.http.put<Tarjeta>(this.urlEndPoint+'/sgv/recargar',tarjeta,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  public agregarAutorizacion() {
    let tok = this.auth.token;
    if (tok != null) {
      return this.httpHeader.append('Authorization', 'Bearer' + tok);
    }
    return this.httpHeader;
  }

  
}