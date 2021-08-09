import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { FilterproductoPipe } from './pipes/filterproducto.pipe';

//
import {NgxPaginationModule} from 'ngx-pagination';
import { MantenerclienteComponent } from './camarena/pages/mantenercliente/mantenercliente.component';
import { RecargaComponent } from './camarena/pages/recarga/recarga.component';


@NgModule({
  declarations: [AppComponent,ConsultarstockComponent, MantenerproductoComponent, MantenerusuarioComponent, GestionarpedidoComponent, GestionarpromocionesComponent, ConsultarpromocionesComponent, FilterproductoPipe, MantenerclienteComponent, RecargaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CamarenaModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
