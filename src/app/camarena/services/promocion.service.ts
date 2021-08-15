import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Promocion } from '../interfaces/promocion';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private urlEndPoint: string = environment.url;
  private httpHeader = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  agregarPromo(prom:Promocion): Observable<Promocion>{
    
    return this.http.post<Promocion>(this.urlEndPoint+'/sgv/promociones',prom,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  listarpromos(): Observable<Promocion[]>{
    
    return this.http.get<Promocion[]>(this.urlEndPoint+'/sgv/promociones',{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  buscarbypromos(id): Observable<Promocion>{
    
    return this.http.get<Promocion>(this.urlEndPoint+'/sgv/promociones/'+id,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  updatepromos(promo:Promocion): Observable<Promocion>{
    
    return this.http.put<Promocion>(this.urlEndPoint+'/sgv/promociones/'+promo.idPromocion,promo,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e=>{
        this.auth.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  deletepromos(id): Observable<Promocion>{
    
    return this.http.delete<Promocion>(this.urlEndPoint+'/sgv/promociones/'+id,{headers:this.agregarAutorizacion()}).pipe(
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