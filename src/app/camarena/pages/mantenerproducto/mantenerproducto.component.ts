import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-mantenerproducto',
  templateUrl: './mantenerproducto.component.html',
  styleUrls: ['./mantenerproducto.component.css'],
})
export class MantenerproductoComponent implements OnInit {
  producto: Producto = new Producto();
  buscar = '';

  productoUpdate = {
    producto_id: '',
    nombre: '',
    descripcion: '',
    stock: '',
    precio: '',
    estado: '',
  };

  public productos: Array<Producto> = [];
  constructor(
    private productoservice: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.productoservice.listarproducto().subscribe((p) => {
      this.productos = p;
    });
  }

  saveProduto() {
    let mensaje:string
    let est:boolean=false
    if(this.producto.nombre===null || this.producto.nombre===""){
      mensaje="El campo nombre esta vacío";
      est=true
    }else if(this.producto.descripcion===null || this.producto.descripcion===""){
      mensaje="El campo descripcion esta vacío";
      est=true
    } else if(isNaN(+this.producto.stock)){
      mensaje="Los dígitos de la cantidad deben ser numéricos";
      est=true
    }else if( this.producto.stock===0 || this.producto.stock===null){
      mensaje="El campo cantidad esta vacío";
      est=true
    } else if(this.producto.precio===null || this.producto.precio===0){
      mensaje="El campo precio esta vacío";
      est=true
    } else if(isNaN(+this.producto.precio)){
      mensaje="Los dígitos del precio deben ser numéricos";
      est=true
    }


    if(est===false){
      Swal.fire({
        title: 'Agregar Producto',
        text: `¿Está seguro que desea agregar ${this.producto.stock} ${this.producto.nombre} (s)?`,
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
          this.productoservice.insertarProducto(this.producto).subscribe(
            (data) => {
              this.listar();
              this.router.navigate(['/dashboard/(sidebar:mantenerproducto)']);
              Swal.fire('Agregar Producto', `${this.producto.stock} ${this.producto.nombre}(s) ha(n) sido agregado con éxito!`,'success')
            }
          );
        }
      })
    }else{
      Swal.fire(mensaje,"Por favor llenar el campo, es requerido","error")
    }
    
  }
  onSubmit() {
    this.saveProduto();
  }

  eliminarProducto(producto_id: number) {
    Swal.fire({
      title: 'Eliminar Producto',
      text: `¿Está seguro que desea eliminar el producto(s)?`,
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
        this.productoservice.eliminarProducto(producto_id).subscribe((data) => {
          this.listar();
          Swal.fire('Eliminar Producto', `El/Los producto(s) ha(n) sido eliminados con éxito!`,'success')
        });
      }
    })
    
  }

  buscarProducto(producto_id: number) {
    this.productoservice.buscarProducto(producto_id).subscribe(
      (data) => {

        this.listar();
      },
      (error) => console.log(error)
    );
  }

  editarProducto(producto) {
    this.productoUpdate = producto;
  }

  actualizarProducto() {
    Swal.fire({
      title: 'Actualizar Producto',
      text: `¿Está seguro que desea actualizar la información del producto: ${this.producto.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar!',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoUpdate.estado = '1';
        this.productoservice.actualizarProducto(this.productoUpdate).subscribe(
          (resp) => {
            this.listar();
            Swal.fire('Actualizar Producto', `La informacipon del producto: ${this.producto.nombre} ha sido actualizada con éxito!`,'success')
          },
          (err) => {
            console.log(err);
          }
        );
      }
    })
    
  }
}
