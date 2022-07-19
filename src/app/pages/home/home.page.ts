import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TicketResponse } from 'src/app/models/response/ticket.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  cadenaId: string='';
  rolName='';
  ticketSeleccionado : TicketResponse;


  constructor() {
    //this.cadenaId = localStorage.getItem('cadenaSelectedId');
    //console.log('La cadena en el home constructor', this.cadenaId );
   }

  ngOnChanges(changes: SimpleChanges): void {
    //this.cadenaId = localStorage.getItem('cadenaSelectedId');
    //console.log('La cadena en el home on onchanges', this.cadenaId );
  }

  ngOnInit() {
      this.cadenaId = localStorage.getItem('cadenaSelectedId');
      this.rolName = localStorage.getItem('rolName');
      //console.log('La cadena en el home ininit', this.cadenaId );
  }

  ticketSeleccionadoChanged(elTicket: TicketResponse){
      this.ticketSeleccionado = elTicket;
  }

}
