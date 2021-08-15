import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidebarComponent,
    LoadingComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports:[
    RouterModule,
    SidebarComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
