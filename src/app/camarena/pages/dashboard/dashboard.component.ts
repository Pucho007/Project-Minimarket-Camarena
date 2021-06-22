import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService, public router: Router) { }

  ngOnInit(): void {
    if(!this.authService.getToken()){
      this.router.navigateByUrl("")
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("");
  }

  toggle(){
    const dashboard=document.querySelector('.dashboard');
    dashboard.classList.toggle('añadir');
    console.log(dashboard)
  }

}
