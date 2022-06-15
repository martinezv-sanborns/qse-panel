import { Component, OnInit } from '@angular/core';
import { TicketApiResponse, TicketBaseResponse } from 'src/app/models/response/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
// import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  listadoTickets: TicketBaseResponse[] = [];
  constructor( private ticketService: TicketService ) { }

  ngOnInit() {

this. getTickets();
  }


  getTickets() {
    this.listadoTickets = [];
    this.ticketService.obtenerTicketsListado(1, 1000).subscribe((exito: TicketApiResponse) => {

      if (exito.result === 'OK') {
        //this.listadoTickets = exito.dtoResult;
        console.log(exito.dtoResult);

      }

    }, (errr) => {
      console.log(errr);
    });
  }

}
