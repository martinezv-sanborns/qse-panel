import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TicketResponse } from 'src/app/models/response/ticket.model';
import { TicketLogResponse } from '../../../models/response/ticket.model';

@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.component.html',
  styleUrls: ['./detalle-ticket.component.scss'],
})
export class DetalleTicketComponent implements OnInit {

  @Input() elTicket: TicketResponse;

  tabActivo = 'relato';
  losticketLogs: TicketLogResponse[]=[];
  descripcion: string;

  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {

    //this.losticketLogs = this.elTicket.ticketLogs;

    for (let ticketlog of this.elTicket.ticketLogs) {
      //console.log(i); // 4, 5, 6
      if (ticketlog.estatus.nombre === 'Iniciado'){
        this.descripcion = ticketlog.observaciones;
      }
    }

  }

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true
    });
  }

  segmentChange(event: any){
    this.tabActivo = event.detail.value;
    console.log('Que tab es:', this.tabActivo);
  }
}
