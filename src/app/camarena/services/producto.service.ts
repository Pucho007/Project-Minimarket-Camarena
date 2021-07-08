import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlEndPoint: string = 'https://sistemagestionventas.herokuapp.com';
  private httpHeader = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private 

  public agregarAutorizacion() {
    let tok = this.auth.token;
    if (tok != null) {
      return this.httpHeader.append('Authorization', 'Bearer' + tok);
    }
    return this.httpHeader;
  }

  listarproducto(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(`${this.urlEndPoint}/sgv/listar_productos`, {
        headers: this.agregarAutorizacion(),
      })
      .pipe(
        catchError((e) => {
          this.auth.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }

  insertarProducto(producto: Producto): Observable<Object> {
    return this.http.post(
      `${this.urlEndPoint}/sgv/insertarProducto`,
      producto,
      {
        headers: this.agregarAutorizacion(),
      }
    );
  }

  eliminarProducto(producto_id: number): Observable<Object> {
    return this.http.post(
      `${this.urlEndPoint}/sgv/eliminarProducto?producto_id=${producto_id}`,
      producto_id,
      {
        headers: this.agregarAutorizacion(),
      }
    );
  }

  buscarProducto(buscar: number): Observable<Producto> {
    return this.http.get<Producto>(
      `${this.urlEndPoint}/sgv/buscarProductoPorId?producto_id=${buscar}`,
      {
        headers: this.agregarAutorizacion(),
      }
    );
  }

  actualizarProducto(producto: any) {
    return this.http.post(
      `${this.urlEndPoint}/sgv/actualizarProducto`,
      producto,
      {
        headers: this.agregarAutorizacion(),
      }
    );
  }
}
