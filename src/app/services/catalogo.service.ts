import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EstatusApiResponse } from '../models/response/estatus.model';
import { TipoApiResponse } from '../models/response/tipo.model';

// services


// models
import { GeneralService } from './general.service';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(private generalService: GeneralService) { }

  obtenerEstatus(numberpage: number, pagesize: number) {
    return this.generalService
      .getQuery(`/api/estatus/listado/async/${numberpage}/${pagesize}`)
      .pipe(
        map(
          (laRespuesta: EstatusApiResponse) => laRespuesta)
          
      );
  }

  obtenerTipos(numberpage: number, pagesize: number) {
    return this.generalService
      .getQuery(`/api/Ticket/tipos/listado/async/${numberpage}/${pagesize}`)
      .pipe(
        map(
          (laRespuesta: TipoApiResponse) => laRespuesta)
          
      );
  }
}