import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TicketResponse } from 'src/app/models/response/ticket.model';


@Component({
  selector: 'app-top-ten-listado',
  templateUrl: './top-ten-listado.component.html',
  styleUrls: ['./top-ten-listado.component.scss'],
})
export class TopTenListadoComponent implements OnInit, OnChanges {
  @Input() entradaListadoTickets: TicketResponse[]=[];
  @Output() salidaTicketSeleccionado: EventEmitter< TicketResponse>= new EventEmitter<TicketResponse>();
  @Output() salidaActualizame: EventEmitter< Boolean>= new EventEmitter<Boolean>();
  ticketSeleccionadoId:string='';

  constructor() { 
    if (this.entradaListadoTickets.length>0){
      this.ticketSeleccionadoId=this.entradaListadoTickets[0].ticketId;
      this.salidaTicketSeleccionado.emit(this.entradaListadoTickets[0]);
    }
  }
  actualizarme(){
    this.salidaActualizame.emit(true);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.entradaListadoTickets.length>0){
      this.ticketSeleccionadoId=this.entradaListadoTickets[0].ticketId;
      this.salidaTicketSeleccionado.emit(this.entradaListadoTickets[0]);
    }
  }

  ticketSelectedChanged(elTicket:TicketResponse)
  {
    this.ticketSeleccionadoId=elTicket.ticketId;
    this.salidaTicketSeleccionado.emit(elTicket);
  }
  ngOnInit() {
    if (this.entradaListadoTickets.length>0){
      this.ticketSeleccionadoId=this.entradaListadoTickets[0].ticketId;
      this.salidaTicketSeleccionado.emit(this.entradaListadoTickets[0]);
    }
  }

}
