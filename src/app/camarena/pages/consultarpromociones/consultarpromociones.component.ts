import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Promocion } from '../../interfaces/promocion';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { PromocionService } from '../../services/promocion.service';

@Component({
  selector: 'app-consultarpromociones',
  templateUrl: './consultarpromociones.component.html',
  styleUrls: ['./consultarpromociones.component.css']
})
export class ConsultarpromocionesComponent implements OnInit {

  constructor(private promocionService:PromocionService,private modalService: NgbModal,private auth:AuthService) { }
  usuario:User
  promociones:Promocion[]
  ngOnInit(): void {
   this.usuario= this.auth.usuario
  }

  buscarPromo(id){
    this.promocionService.buscarbypromos(id).subscribe(
      x=>{
        this.promociones.push(x)
        
      }
    )
  }

}
