import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-mantenerusuario',
  templateUrl: './mantenerusuario.component.html',
  styleUrls: ['./mantenerusuario.component.css'],
})
export class MantenerusuarioComponent implements OnInit {
  public usuarios: Array<Usuario> = [];
  public Usuario: Usuario=new Usuario();
  public username:string
  constructor(private usuarioservice: UsuarioService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.usuarioservice.listarusuario().subscribe((p) => {
      this.usuarios = p;
    });
  }
  agregarUsuario(){
    let mensaje:string
    let est:boolean=false
    if(this.Usuario.apellido===null || this.Usuario.apellido===""){
      mensaje="El campo apellido esta vacío";
      est=true
    } else if(this.Usuario.nombre===null || this.Usuario.nombre===""){
      mensaje="El campo nombre esta vacío";
      est=true
    }else if(this.Usuario.dni===null || this.Usuario.dni===""){
      mensaje="El campo dni esta vacío";
      est=true
    } else if(isNaN(+this.Usuario.dni)){
      mensaje="Los dígitos del dni deben ser numéricos";
      est=true
    }else if( this.Usuario.email===null || this.Usuario.email===""){
      mensaje="El campo email esta vacío";
      est=true
    } else if(!/\S+@\S+\.\S+/.test(this.Usuario.email)){
      mensaje="El campo correo debe tener un formato válido";
      est=true
    }else if(this.Usuario.direccion===null || this.Usuario.direccion===""){
      mensaje="El campo dirección esta vacío";
      est=true
    } else if(this.Usuario.password===null || this.Usuario.password===""){
      mensaje="El campo contraseña esta vacío";
      est=true
    } else if(this.Usuario.telefono===null || this.Usuario.telefono===""){
      mensaje="El campo telefono esta vacío";
      est=true
    }else if(isNaN(+this.Usuario.telefono)){
      mensaje="Los dígitos del teléfono deben ser numéricos";
      est=true
    }


    if(est===false){
      Swal.fire({
        title: 'Agregar participante',
        text: `¿Está seguro que desea agregar a ${this.Usuario.nombre} ${this.Usuario.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agregar!',
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
         this.usuarioservice.save(this.Usuario).subscribe(

           m=>{this.listar();
             Swal.fire("Participante registrado","Participnate registrado con éxito","success")}
         )
        }
      })
    }else{
      Swal.fire(mensaje,"Por favor llenarlo, el campo es requerido","error")
    }
  }

  buscar(){
    this.usuarioservice.buscar(this.username).subscribe(
      m=>{
        this.usuarios=m
      }
    )
  }

  eliminar(data){
    Swal.fire({
      title: 'Eliminar participante',
      text: `¿Está seguro que desea eliminar a ${data.nombre} ${data.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioservice.eliminar(data.username).subscribe(
          m=>{
            this.listar();
          }
        )
      }
    })
    
  }

  actualizar(data){ console.log(data)
    
  }
}
