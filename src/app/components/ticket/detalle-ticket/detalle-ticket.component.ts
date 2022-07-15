import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

// globals
import { environment } from '../../../../environments/environment';

// components
import { EstatusMotivoTicketComponent } from '../estatus-motivo-ticket/estatus-motivo-ticket.component';

// services
import { TicketService } from '../../../services/ticket.service';

// models
import { TicketApiResponse, TicketLogResponse, TicketResponse } from 'src/app/models/response/ticket.model';
import { TicketStatusRequest } from 'src/app/models/request/ticket.model';


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
    this.losticketLogs = this.elTicket.ticketLogs.filter(t=> t.estatus.estatusId !== environment.estatusIniciado);
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
          icon: 'help-circle-outline',
          titleWindow: 'Intervenir Caso',
          titleMessage: 'Nueva intervención sobre el caso:',
          txtMessage: 'Escriba intervención',
          titleErr: 'Nueva intervención',
          messageErr: 'Escriba una intervención'
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onIntervenirCaso(ticketSelected, data.motivo);
    }
  }

  async cerrarCaso(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon: 'chatbox-outline',
          titleWindow: 'Cerrar Caso',
          titleMessage: '¿Está seguro que desea Cerrar el Q&SE?',
          txtMessage: 'Escriba aquí el motivo',
          titleErr: '¿Motivo?',
          messageErr: 'Por favor escriba el motivo'
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onCerrarCaso(ticketSelected, data.motivo);
    }
  }

  async onCerrarCaso(ticketSelected: TicketResponse, elMotivo: string) {
    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true
    };

    this.ticketService.cerrar(elNuevoStatusTicket).subscribe((exito: TicketApiResponse) => {

      if (exito.result === 'OK') {
        // actualizar ticket
        this.elTicket = exito.dtoResult;

        Swal.fire({
          icon: 'success',
          title: 'Cerrar Caso',
          text: 'El caso fue cerrado exitosamente',
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Cerrar Caso',
          text: exito.error,
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      }

    }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error de comunicación, reinténtelo nuevamente.',
        heightAuto: false
      });
    });
  }

  async onIntervenirCaso(ticketSelected: TicketResponse, elMotivo: string) {

    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true
    };

    this.ticketService.intervenir(elNuevoStatusTicket).subscribe((exito: TicketApiResponse) => {

      if (exito.result === 'OK') {
        this.elTicket = exito.dtoResult;
        Swal.fire({
          icon: 'success',
          title: 'Intervenir Caso',
          text: 'El caso fue intervinido exitosamente',
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Intervenir Caso',
          text: exito.error,
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      }

    }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error de comunicación, reinténtelo nuevamente.',
        heightAuto: false
      });
    });

  }

}
