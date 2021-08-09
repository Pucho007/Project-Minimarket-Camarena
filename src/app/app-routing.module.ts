import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './camarena/pages/login/login.component';
import { DashboardComponent } from './camarena/pages/dashboard/dashboard.component';
import { MantenerproductoComponent } from './camarena/pages/mantenerproducto/mantenerproducto.component';
import { MantenerusuarioComponent } from './camarena/pages/mantenerusuario/mantenerusuario.component';
import { GestionarpedidoComponent } from './camarena/pages/gestionarpedido/gestionarpedido.component';
import { GestionarpromocionesComponent } from './camarena/pages/gestionarpromociones/gestionarpromociones.component';
import { ConsultarpromocionesComponent } from './camarena/pages/consultarpromociones/consultarpromociones.component';
import { ConsultarstockComponent } from './camarena/pages/consultarstock/consultarstock.component';
import { MantenerclienteComponent } from './camarena/pages/mantenercliente/mantenercliente.component';
import { RecargaComponent } from './camarena/pages/recarga/recarga.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {path: 'dashboard',component: DashboardComponent, children: [
      { path: '', component: MantenerproductoComponent, outlet: 'sidebar' },
      { path: 'mantenerproducto',component: MantenerproductoComponent,outlet: 'sidebar'},
      { path: 'mantenerusuario',component: MantenerusuarioComponent,outlet: 'sidebar'},
      { path: 'gestionarpedido',component: GestionarpedidoComponent,outlet: 'sidebar'},
      { path: 'gestionarpromociones',component: GestionarpromocionesComponent,outlet: 'sidebar'},
      { path: 'consultarpromociones',component: ConsultarpromocionesComponent,outlet: 'sidebar'},
      { path: 'consultarstock',component: ConsultarstockComponent,outlet: 'sidebar'},
      { path: 'mantenercliente',component: MantenerclienteComponent,outlet: 'sidebar'},
      { path: 'recarga',component: RecargaComponent,outlet: 'sidebar'}
  ]},
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
