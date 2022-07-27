import { Component, Input, OnInit } from '@angular/core';
import { NumerosTicketsResponseApiResponse, NumeroTicketsResponse } from 'src/app/models/helper.model';
import { TicketResponse, TicketsApiResponse } from 'src/app/models/response/ticket.model';
import { TiendaApiResponse } from 'src/app/models/response/tiendaresponse.model';
import { HelperService } from 'src/app/services/helper.service';
import { TicketService } from 'src/app/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-numero-ticket-tienda',
  templateUrl: './numero-ticket-tienda.component.html',
  styleUrls: ['./numero-ticket-tienda.component.scss'],
})
export class NumeroTicketTiendaComponent implements OnInit {

  listatickets: TicketResponse[] = [];
  @Input() laTienda: string;
  paginaActual: number;
  noPaginas: number;
  activePage = 0;
  totalPaginasArray: number[] = [];
  lacadenaSelectedId: string;
  totalRegistros: number;
  ListaTicEsta: NumeroTicketsResponse[] = [];

  constructor(private ticketService: TicketService, private helperService: HelperService) {
    //this.getNumeroTiendasEstatus();
   }

  ngOnInit() {

    this.getNumeroTiendasEstatus();
  }

  getNumeroTiendasEstatus() {
    this.ListaTicEsta = [];
    this.lacadenaSelectedId = localStorage.getItem('cadenaSelectedId');
    console.log("Tienda", this.laTienda);

    this.ticketService.obtenerTicketsNumero(this.lacadenaSelectedId, this.laTienda, 1, 100)
    .subscribe((exito: NumerosTicketsResponseApiResponse) => {
      if (exito.result === 'OK') {
        this.ListaTicEsta = exito.dtoResult;
        console.log('el listado de tiendas', exito);
        console.log('# de Registros', exito.totalRegistros);

      }
      //this.cargando = false;
    }, (errr) => {
      //this.cargando = false;
      console.log(errr);
    });
 
  }

}
