import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CamarenaModule } from './camarena/camarena.module';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MantenerproductoComponent } from './camarena/pages/mantenerproducto/mantenerproducto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MantenerusuarioComponent } from './camarena/pages/mantenerusuario/mantenerusuario.component';
import { GestionarpedidoComponent } from './camarena/pages/gestionarpedido/gestionarpedido.component';
import { GestionarpromocionesComponent } from './camarena/pages/gestionarpromociones/gestionarpromociones.component';
import { ConsultarpromocionesComponent } from './camarena/pages/consultarpromociones/consultarpromociones.component';
import { ConsultarstockComponent } from './camarena/pages/consultarstock/consultarstock.component';

@NgModule({
  declarations: [AppComponent,ConsultarstockComponent, MantenerproductoComponent, MantenerusuarioComponent, GestionarpedidoComponent, GestionarpromocionesComponent, ConsultarpromocionesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CamarenaModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
