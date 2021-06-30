import { Component, OnInit } from '@angular/core';
import { usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-mantenerusuario',
  templateUrl: './mantenerusuario.component.html',
  styleUrls: ['./mantenerusuario.component.css'],
})
export class MantenerusuarioComponent implements OnInit {
  public usuarios: Array<usuario> = [];
  constructor(private usuarioservice: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioservice.listarusuario().subscribe((p) => {
      this.usuarios = p;
    });
  }
}
