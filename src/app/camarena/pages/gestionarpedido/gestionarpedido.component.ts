import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

//importacion de modelo y el srvicio
import { Producto } from '../../interfaces/producto';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { ProductoService } from '../../services/producto.service';
import * as moment from 'moment';
import { Tarjeta } from '../../interfaces/tarjeta';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-gestionarpedido',
  templateUrl: './gestionarpedido.component.html',
  styleUrls: ['./gestionarpedido.component.css']
})
export class GestionarpedidoComponent implements OnInit {

  @ViewChild('pagar', { static: true } ) pagar: TemplateRef<any>;

  public productos: Array<Producto>=[];
  filterproductos='';
  p: number = 1;
  public Carrito: Array<Producto>=[];
  public datos:User
  public fecha:any
  public tarjeta:Tarjeta
  public total:number=0.0
  public sald:number

  //modal
  modalPagar:NgbModalRef

  constructor(
    private productoservice:ProductoService,
    private modalService: NgbModal,
    private auth:AuthService,
    private pedidoService:PedidoService) 
    { pdfMake.vfs = pdfFonts.pdfMake.vfs;}
  ngOnInit(): void {
    this.productoservice.listarproducto().subscribe((p)=>{
      this.productos=p;
    });
    this.datos=this.auth.usuario
    this.fecha=moment().format('DD/MM/YYYY')
    this.pedidoService.tarjetabyUser(this.datos.username).subscribe(
      x=>{this.tarjeta=x
      this.sald=this.tarjeta.saldo}
    )
  }
  AgregarProducto(data:Producto){
    let agregado:boolean=false;
    for (let elemento of this.Carrito) {
      if(elemento.producto_id==data.producto_id){
        if(elemento.stock<data.stock){
          elemento.stock=elemento.stock+1;
          
        }
        agregado=true;
      }
    }
    if(agregado===false){
      let d = Object.assign({} , data)
      d.stock=1;
      this.total+=data.precio*1
      this.sald-=this.total
      this.Carrito.push(d);
    }
  }
  EliminarProducto(index){
    this.total-=this.Carrito[index].stock*this.Carrito[index].precio
    this.sald+=this.Carrito[index].precio
    this.Carrito.splice(index,1);
    
  }

  DismininuirProducto(index){
    if(this.Carrito[index].stock>1){
      this.Carrito[index].stock= this.Carrito[index].stock-1;
      this.total-=this.Carrito[index].precio
      this.sald+=this.Carrito[index].precio
    }else{
      this.EliminarProducto(index);
    }
  }

  AumentarProducto(data:Producto,index){
    var n=this.buscarProducto(data);
    if(n>-1){
      if(this.Carrito[index].stock<this.productos[n].stock){
        this.Carrito[index].stock=this.Carrito[index].stock+1;
        this.total+=this.Carrito[index].precio
        this.sald-=this.Carrito[index].precio
      }
    }
  }
  buscarProducto(data:Producto){
    var i=-1;
    for (let elemento of this.productos) {
      i=i+1;
      if(elemento.producto_id==data.producto_id){
        return i;
      }
    }
    return -1;
  }

  pagarlo(){
    if(this.Carrito.length===0){
      Swal.fire('Pagar','Por favor agregue productos a su carrito','warning')
    }else{
      this.modalPagar=this.modalService.open(this.pagar)
    }
  }

  generarComprobante(){
    // this.pedidoService.insert(this.auth.usuario.username).subscribe(
    //   x=>{
        Swal.fire({
          title: 'El pago se realizó con éxito',
          text: `¿Desea generar comprobante de pago?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, Generar!',
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.comprobante()
          }
        })
    //   }
    // )
  }

  comprobante(){
    const pdf= new PdfMakeWrapper();
    pdf.add(
      new Txt('Minimarket "Camarena"').alignment('center').end
    )
    pdf.add(
      new Txt('RUC: 0077899115').alignment('center').end
    )
    pdf.add(
      new Txt('Bebidas, abarrotes, comestibles, lacteos, etc.').alignment('center').end
    )
    pdf.add(
      pdf.ln(1)
    )
    pdf.create().open()
  }

}
