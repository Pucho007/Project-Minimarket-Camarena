import { Component, OnInit } from '@angular/core';
import { producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-mantenerproducto',
  templateUrl: './mantenerproducto.component.html',
  styleUrls: ['./mantenerproducto.component.css'],
})
export class MantenerproductoComponent implements OnInit {
  public productos: Array<producto> = [];
  constructor(private productoservice: ProductoService) {}

  ngOnInit(): void {
    this.productoservice.listarproducto().subscribe((p) => {
      this.productos = p;
    });
  }
}
