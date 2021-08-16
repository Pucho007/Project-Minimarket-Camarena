import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
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
  promociones:Array<Promocion>=[]
  promocion: Promocion=new Promocion()
  ngOnInit(): void {
   this.usuario= this.auth.usuario
  }

  buscarPromo(){
    let mensaje=""
    this.promocion.idPromocion==null?mensaje="El código de la promoción es requerido":
    this.promocion.cantidad==null?mensaje="La cantidad de promociones es requerida": mensaje="";
    if(mensaje===""){
      this.promocionService.buscarbypromos(this.promocion.idPromocion).subscribe(
        x=>{
          this.promociones.forEach(d=>{
            if(d.idPromocion===this.promocion.idPromocion){
              Swal.fire('Agregar promocion','La promocion ya ha sido agregada','error')
            }else{
              x.cantidad=this.promocion.cantidad
              this.promociones.push(x)
              console.log('prom',this.promociones)
            }
          }) 
          
        },(err) => {
          console.log(err)
          if (err.status===500) {
            Swal.fire('Error', err.error.message, 'error');
          }
        }
      )
    }else{
      Swal.fire(mensaje,'Validación de campos','error')
    }
    
  }

}
