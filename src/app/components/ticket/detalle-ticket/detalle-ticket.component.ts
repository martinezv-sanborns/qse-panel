import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';

// components
import { EstatusMotivoTicketComponent } from '../estatus-motivo-ticket/estatus-motivo-ticket.component';

// models
import { TicketLogResponse, TicketResponse } from 'src/app/models/response/ticket.model';


@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.component.html',
  styleUrls: ['./detalle-ticket.component.scss'],
})
export class DetalleTicketComponent implements OnInit {

  @Input() elTicket: TicketResponse;

  tabActivo = 'relato';
  losticketLogs: TicketLogResponse[] = [];
  descripcion: string;

  constructor(private modalCrtl: ModalController,
    private popVerCtrl: PopoverController) { }

  ngOnInit() {

    //this.losticketLogs = this.elTicket.ticketLogs;

    // for (let ticketlog of this.elTicket.ticketLogs) {
    //   //console.log(i); // 4, 5, 6
    //   if (ticketlog.estatus.nombre === 'Iniciado'){
    //     this.descripcion = ticketlog.observaciones;
    //   }
    // }

  }

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true
    });
  }

  segmentChange(event: any) {
    this.tabActivo = event.detail.value;
    console.log('Que tab es:', this.tabActivo);
  }

  async cerrarCaso(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          title: 'Cerrar Caso',
          mensajeMotivo: '¿Está seguro que desea Cerrar el Q&SE?',
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.cancelarTicket(ticketSelected, data.motivo);
    }
  }

  async cancelarTicket(ticketSelected: TicketResponse, elMotivo: string) {



  }

}
