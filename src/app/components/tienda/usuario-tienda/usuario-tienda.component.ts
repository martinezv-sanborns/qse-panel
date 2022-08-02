import { Component, Input, OnInit } from '@angular/core';
import { UsuariosTiendaApiResponse, UsuarioTiendaApiResponse, UsuarioTiendaResponse } from 'src/app/models/response/tiendaresponse.model';
import { environment } from 'src/environments/environment';
import { TiendaService } from '../../../services/tienda.service';

@Component({
  selector: 'app-usuario-tienda',
  templateUrl: './usuario-tienda.component.html',
  styleUrls: ['./usuario-tienda.component.scss'],
})
export class UsuarioTiendaComponent implements OnInit {
  ListaUsuarioTienda: UsuarioTiendaResponse[] = [];
  @Input() laTienda: string;
  
  usuariot: UsuarioTiendaResponse;

  constructor(private tiendaService: TiendaService) { }

  ngOnInit() {
    this.getUsuarioTienda();
  }


  getUsuarioTienda() {
    this.ListaUsuarioTienda = [];
    //console.log("Tienda", this.laTienda);

    this.tiendaService.obtenerUsuarioRolTienda(this.laTienda, environment.DistritalId)
    .subscribe((exito: UsuariosTiendaApiResponse) => {
      if (exito.result === 'OK') {
        this.ListaUsuarioTienda = exito.dtoResult;
      if(this.ListaUsuarioTienda.length > 0){
        this.ListaUsuarioTienda = this.ListaUsuarioTienda.sort((a,b) => (a.fechaAlta > b.fechaAlta) ? 1 : -1);
}
      }
      //this.cargando = false;
    }, (errr) => {
      //this.cargando = false;
      console.log(errr);
    });
 
  }

}
