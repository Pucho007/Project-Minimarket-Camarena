import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
