import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

// components
import { EstatusMotivoTicketComponent } from '../estatus-motivo-ticket/estatus-motivo-ticket.component';

// services
import { TicketService } from '../../../services/ticket.service';

// models
import { TicketLogResponse, TicketResponse } from 'src/app/models/response/ticket.model';
import { TicketStatusRequest } from 'src/app/models/request/ticket.model';
import { environment } from '../../../../environments/environment';



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

  constructor(private modalCrtl: ModalController, private ticketService: TicketService) { }

  ngOnInit() {
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

  async intervenir(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon:'help-circle-outline',
          titleWindow: 'Intervenir Caso',
          titleMessage: 'Nueva observación sobre el caso:',
          txtMessage:'Escriba observación',
          titleErr: 'Nueva observación',
          messageErr:'Escriba una observación'
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.intervenirTicket(ticketSelected, data.motivo);
    }
  }

  async cerrarCaso(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon:'chatbox-outline',
          titleWindow: 'Cerrar Caso',
          titleMessage: '¿Está seguro que desea Cerrar el Q&SE?',
          txtMessage:'Escriba aquí el motivo',
          titleErr:'¿Motivo?',
          messageErr:'Por favor escriba el motivo'
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.cancelarTicket(ticketSelected, data.motivo);
    }
  }

  async cancelarTicket(ticketSelected: TicketResponse, elMotivo: string) {
    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true
    };

    this.ticketService.cerrar(elNuevoStatusTicket).subscribe((exito)=>{

      if(exito.result === 'OK'){

      }

    }, (err)=>{
      console.log(err);
    });
  }

  async intervenirTicket(ticketSelected: TicketResponse, elMotivo: string) {

    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true
    };

    this.ticketService.intervenir(elNuevoStatusTicket).subscribe((exito)=>{

      if(exito.result === 'OK'){

      }

    }, (err)=>{
      console.log(err);
    });

  }

}
