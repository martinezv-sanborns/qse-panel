import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioResponse } from '../../models/response/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  Usuarios: UsuarioResponse [] = [];

  cargando:false;

  constructor(private usuarioService: UsuarioService) {


   }

  ngOnInit() {
  
  this.usuarioService.ObtenerListado(1,10000).subscribe(exito=>{

   
    this.Usuarios= exito.dtoResult;

    console.log(exito);
  });
  
  }


  Activar(usuarioId:string){


  }


  Desbloquear(usuario:string){}

}
