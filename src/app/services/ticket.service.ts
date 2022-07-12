import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// services
import { GeneralService } from './general.service';

// models
import { TicketApiResponse, TicketsApiResponse} from '../models/response/ticket.model';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private generalService: GeneralService) { }

  obtenerTicketsListado(cadenaid: string, numberpage: number, pagesize: number) {
    return this.generalService
      .getQuery(`/api/ticket/listado/async/${cadenaid}/${numberpage}/${pagesize}`)
      .pipe(
        map(
          (laRespuesta: TicketsApiResponse) => laRespuesta)
      );
  }

  obtenerTicketsFiltro(cadenaid: string, filtro: string, numberpage: number, pagesize: number) {
    return this.generalService
      .getQuery(`/api/ticket/listado/cadena/filtros/async/${filtro}/${cadenaid}/${numberpage}/${pagesize}`)
      .pipe(
        map(
          (laRespuesta: TicketsApiResponse) => laRespuesta)
      );
  }

  cerrar(){}
  intervenir(){}
  reabrir(){}

}
