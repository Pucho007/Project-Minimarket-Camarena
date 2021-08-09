import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
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
    FooterComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
