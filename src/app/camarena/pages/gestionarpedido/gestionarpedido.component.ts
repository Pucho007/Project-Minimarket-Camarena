import { Component, OnInit } from '@angular/core';

//importacion de modelo y el srvicio
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-gestionarpedido',
  templateUrl: './gestionarpedido.component.html',
  styleUrls: ['./gestionarpedido.component.css']
})
export class GestionarpedidoComponent implements OnInit {
  public productos: Array<Producto>=[];
  filterproductos='';
  p: number = 1;
  public Carrito: Array<Producto>=[];

  constructor(private productoservice:ProductoService) { }
  ngOnInit(): void {
    this.productoservice.listarproducto().subscribe((p)=>{
      this.productos=p;
    });
  }
  AgregarProducto(data:Producto){
    let agregado:boolean;
    agregado=false;
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
      this.Carrito.push(d);
    }
  }
  EliminarProducto(index){
    this.Carrito.splice(index,1);
  }

  DismininuirProducto(index){
    if(this.Carrito[index].stock>1){
      this.Carrito[index].stock= this.Carrito[index].stock-1;
    }else{
      this.EliminarProducto(index);
    }
  }

  AumentarProducto(data:Producto,index){
    var n=this.buscarProducto(data);
    if(n>-1){
      if(this.Carrito[index].stock<this.productos[n].stock){
        this.Carrito[index].stock=this.Carrito[index].stock+1;
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

}
