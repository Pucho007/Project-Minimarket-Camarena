import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './camarena/pages/login/login.component';
import { DashboardComponent } from './camarena/pages/dashboard/dashboard.component';

const routes: Routes=[
  {
      path:'',
      component: LoginComponent,
      pathMatch: 'full'
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo:''
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
