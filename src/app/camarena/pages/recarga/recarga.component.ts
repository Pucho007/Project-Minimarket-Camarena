import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Tarjeta } from '../../interfaces/tarjeta';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/pedido.service';
import { RecargaService } from '../../services/recarga.service';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css']
})
export class RecargaComponent implements OnInit {

  tarjeta:Tarjeta =new Tarjeta();
  constructor(private pedidoService:PedidoService,private auth:AuthService,private recargService:RecargaService) { }

  ngOnInit(): void {
    
  }

  buscar(id){
    let mensaje=""
    if(this.tarjeta.tarjeta_id===null || this.tarjeta.tarjeta_id===0 || this.tarjeta.tarjeta_id===undefined){
      mensaje="El campo número de tarjeta esta vacío";
    }else if(isNaN(+this.tarjeta.tarjeta_id)){
      mensaje="El campo debe ser un caracter numérico";
    }
    if(mensaje===""){
      this.pedidoService.tarjetabyId(id).subscribe(
        x=>{
          this.tarjeta=x
          this.tarjeta.total=0
        }
      )
    }else{
      Swal.fire(mensaje,"Por favor llenar el campo, es requerido","error")
    }
    
  }

  calcular(monto:number){
    this.tarjeta.total=0
    this.tarjeta.total+= +monto
    this.tarjeta.total+= +this.tarjeta.saldo
    console.log(this.tarjeta.total)
  }

  recargar(){
    let mensaje=""
    if(this.tarjeta.tarjeta_id===null || this.tarjeta.tarjeta_id===0 || this.tarjeta.tarjeta_id===undefined){
      mensaje="El campo número de tarjeta esta vacío";
    }else if(isNaN(+this.tarjeta.tarjeta_id)){
      mensaje="El campo número de tarjeta debe ser un caracter numérico";
    } else if(this.tarjeta.monto===null || this.tarjeta.monto===0 || this.tarjeta.monto===undefined){
      mensaje="El campo monto esta vacío";
    }else if(isNaN(+this.tarjeta.monto)){
      mensaje="El campo monto debe ser un caracter numérico";
    }
    if(mensaje===""){
    Swal.fire({
      title: 'Recargar Tarjeta',
      text: `¿Está seguro que desea recargar su tarjeta con número ${this.tarjeta.tarjeta_id} con el monto de S/. ${this.tarjeta.monto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, recargar!',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        let monto=this.tarjeta.monto
        this.tarjeta.saldo= +this.tarjeta.total
        this.recargService.recarga(this.tarjeta).subscribe(
          (data) => {
            Swal.fire('Recargar Tarjeta', `Se recargo su tarjeta con el monto de ${monto} ahora su saldo total es ${this.tarjeta.total}`,'success')
          }
        );
      }
    })
  }else{
    Swal.fire(mensaje,"Por favor llenar el campo, es requerido","error")
  }
    
  }

}
