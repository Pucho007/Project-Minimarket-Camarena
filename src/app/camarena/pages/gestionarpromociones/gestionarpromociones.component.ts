import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Promocion } from '../../interfaces/promocion';
import { PromocionService } from '../../services/promocion.service';

@Component({
  selector: 'app-gestionarpromociones',
  templateUrl: './gestionarpromociones.component.html',
  styleUrls: ['./gestionarpromociones.component.css']
})
export class GestionarpromocionesComponent implements OnInit {

  @ViewChild('actualizar', { static: true } ) actualizar: TemplateRef<any>;

  promos:Promocion[]
  promocion: Promocion=new Promocion();
  updatepromocion: Promocion=new Promocion();

  //modal
  modalActu:NgbModalRef
  constructor(private promocionService:PromocionService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarPromos()
  }

  listarPromos(){
    this.promocionService.listarpromos().subscribe(
      p=>{
        this.promos=p
      }
    )
  }

  agregarPromo(){
    let mensaje:string="";
    if(this.promocion.nombre===null || this.promocion.nombre===undefined || this.promocion.nombre===""){
      mensaje="El nombre es requerido"
    }else if(this.promocion.costo===null){
      mensaje="El costo es requerido"
    }else if(isNaN(this.promocion.costo)){
      mensaje="El costo debe ser de caracter numerico"
    }else if(this.promocion.descripcion===null || this.promocion.descripcion===undefined || this.promocion.descripcion===""){
      mensaje="La descripcion es requerida"
    }else if(this.promocion.cantidad===null){
      mensaje="La cantidad es requerida"
    }else if(isNaN(+this.promocion.cantidad)){
      mensaje="La cantidad debe ser de caracter numerico"
    }else if(this.promocion.idProducto===null){
      mensaje="El codigo del producto es requerido"
    }else if(isNaN(+this.promocion.idProducto)){
      mensaje="El codigo del producto debe ser de caracter numerico"
    }

    if(mensaje===""){
      console.log(this.promocion)
      this.promocionService.agregarPromo(this.promocion).subscribe(
        p=>{
          switch(p.descripcion){
            case 'ok':
              Swal.fire("Agregar Promoci??n","La promoci??n fue agregada con ??xito","error")
            default:
              Swal.fire("Agregar Promoci??n",p.descripcion,"error")
          }
        }
      )
    }else{
      Swal.fire(mensaje,"Por favor llenarlo, el campo es requerido","error")
    }
  }

  abrirActualizar(data){
    this.modalActu=this.modalService.open(this.actualizar)
    this.updatepromocion=data
  }

  actualizarPromo(){
    this.promocionService.updatepromos(this.updatepromocion).subscribe(
      x=>{
        Swal.fire('Actualizar promoci??n',"La promoci??n se actualiz?? con ??xito","success")
      }
    )
  }

  deletePromo(data:Promocion){
    Swal.fire({
      title: 'Eliminar promoci??n',
      text: `??Esta seguro que desea eliminar la promoci??n?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'S??, Eliminar!',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.promocionService.deletepromos(data.idPromocion).subscribe(
          x=>{
            this.listarPromos()
            Swal.fire('Eliminar promoci??n',"La promoci??n se elimin?? con ??xito","success")
          }
        )
      }
    })
    
  }


}