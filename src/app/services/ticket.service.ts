import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// services


// models
import { TicketApiResponse} from '../models/response/ticket.model';
import { GeneralService } from './general.service';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private generalService: GeneralService) { }

  obtenerTicketsListado(numberpage: number, pagesize: number) {
    return this.generalService
      .getQuery(`/api/ticket/listado/async/${numberpage}/${pagesize}`)
      .pipe(
        map(
          (laRespuesta: TicketApiResponse) => laRespuesta)
          
      );
  }
}