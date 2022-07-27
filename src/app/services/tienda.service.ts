import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TiendaActivaRequest, TiendaRequest } from '../models/request/tienda.model';
import { TiendaApiResponse, TiendasApiResponse } from '../models/response/tiendaresponse.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private generalService: GeneralService) { }


  obtenerTiendasFiltro(cadenaid: string, filtro: string, numberpage: number, pagesize: number) {
    return this.generalService
      .getQuery(`/api/tienda/listado/cadena/filtros/async/${filtro}/${cadenaid}/${numberpage}/${pagesize}`)
      .pipe(
        map(
          (laRespuesta: TiendasApiResponse) => laRespuesta)
      );
  }

  obtenerTiendas(cadenaid: string, numberpage: number, pagesize: number) {
    return this.generalService
      .getQuery(`/api/tienda/listado/cadena/${cadenaid}/async/${numberpage}/${pagesize}`)
      .pipe(
        map(
          (laRespuesta: TiendasApiResponse) => laRespuesta)
      );
  }

  obtenerTiendasUsuario(){
    return this.generalService
    .getQuery(`/api/Tienda/usuario/listado/async`)
    .pipe(
      map(
        (laRespuesta: TiendasApiResponse) => laRespuesta)
    );
  }

  cambiarActivo(laTienda: TiendaActivaRequest) {
    return this.generalService
      .Post(`/api/tienda/estatus/async`, laTienda)
      .pipe(
        map(
          (laRespuesta: TiendaApiResponse) => laRespuesta)
      );
  }
  
  crearTienda(tienda:TiendaRequest){
    console.log('Objeto para crear la tienda', tienda);
    return this.generalService.Post(`/api/tienda/async`, tienda).pipe(
      map(
        (laRespuesta:TiendaApiResponse)=>laRespuesta)
        );
  }
}
