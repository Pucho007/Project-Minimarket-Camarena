import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarjeta } from '../interfaces/tarjeta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private urlEndPoint: string = environment.url;
  private httpHeader = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  tarjetabyUser(username: string): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(
      `${this.urlEndPoint}/sgv/tarjetabyUser?username=${username}`,
      {
        headers: this.agregarAutorizacion(),
      }
    );
  }

  tarjetabyId(tarjeta_id: number): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(
      `${this.urlEndPoint}/sgv/tarjetabyId?tarjeta_id=${tarjeta_id}`,
      {
        headers: this.agregarAutorizacion(),
      }
    );
  }

  insert(username: string): Observable<any> {
    return this.http.get<any>(
      `${this.urlEndPoint}/sgv/añadirPedido?username=${username}`,
      {
        headers: this.agregarAutorizacion(),
      }
    );
  }

  public agregarAutorizacion() {
    let tok = this.auth.token;
    if (tok != null) {
      return this.httpHeader.append('Authorization', 'Bearer' + tok);
    }
    return this.httpHeader;
  }

  
}
