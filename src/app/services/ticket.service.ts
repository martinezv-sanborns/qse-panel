import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// services
import { GeneralService } from './general.service';

// models
import { TicketApiResponse, TicketsApiResponse} from '../models/response/ticket.model';
import { TicketStatusRequest } from '../models/request/ticket.model';
import { NumerosTicketsResponseApiResponse } from '../models/helper.model';


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
    const query =`/api/ticket/listado/cadena/filtros/async/${filtro}/${cadenaid}/${numberpage}/${pagesize}`;
    //console.log('Obteniendo TOP TEN',  query);
    return this.generalService
      .getQuery(query)
      .pipe(
        map(
          (laRespuesta: TicketsApiResponse) => laRespuesta)
      );
  }

  cerrar(ticketStatus: TicketStatusRequest){
    return this.generalService
    .Put(`/api/Ticket/cerrar/async`, ticketStatus)
    .pipe(
      map(
        (laRespuesta: TicketApiResponse) => laRespuesta)
    );
  }

  intervenir(ticketStatus: TicketStatusRequest){
    return this.generalService
    .Put(`/api/Ticket/intervenir/async`, ticketStatus)
    .pipe(
      map(
        (laRespuesta: TicketApiResponse) => laRespuesta)
    );
  }

  reabrir(ticketStatus: TicketStatusRequest){
    return this.generalService
    .Put(`/api/Ticket/reabrir/async`, ticketStatus)
    .pipe(
      map(
        (laRespuesta: TicketApiResponse) => laRespuesta)
    );
  }

  obtenerTicketsTiendaEstatus(cadenaid: string, tiendaid: string, estatusid: string, numberpage: number, pagesize: number) {
    const query =`/api/ticket/listado/tienda/async/${cadenaid}/${tiendaid}/${estatusid}/${numberpage}/${pagesize}`;
    return this.generalService
      .getQuery(query)
      .pipe(
        map(
          (laRespuesta: TicketsApiResponse) => laRespuesta)
      );
  }


  obtenerTicketsNumero(cadenaid: string, tiendaid: string, numberpage: number, pagesize: number) {
    const query =`/api/ticket/listado/tienda/numerotickets/async/${cadenaid}/${tiendaid}/${numberpage}/${pagesize}`;
    return this.generalService
      .getQuery(query)
      .pipe(
        map(
          (laRespuesta: NumerosTicketsResponseApiResponse) => laRespuesta)
      );
  }
}
