import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';

// globals
import { environment } from '../../../../environments/environment';

// components
import { EstatusMotivoTicketComponent } from '../estatus-motivo-ticket/estatus-motivo-ticket.component';

// services
import { TicketService } from '../../../services/ticket.service';
import { HelperService } from '../../../services/helper.service';

// models
import { TicketApiResponse, TicketLogResponse, TicketResponse } from 'src/app/models/response/ticket.model';
import { TicketStatusRequest } from 'src/app/models/request/ticket.model';
import { MenuDetalleCasoComponent } from '../menu-detalle-caso/menu-detalle-caso.component';




@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.component.html',
  styleUrls: ['./detalle-ticket.component.scss'],
})
export class DetalleTicketComponent implements OnInit, OnChanges {

  @Input() elTicket: TicketResponse;
  @Input() elRolUsuario: string;
  @Input() isModal: boolean;
  @Output() salidaTicketCambiado: EventEmitter<Boolean>= new EventEmitter();

  tabActivo = 'relato';
  losticketLogs: TicketLogResponse[] = [];
  descripcion: string;
  permisoCerrado: boolean;
  permisoAbierto: boolean;

  constructor(private modalCrtl: ModalController,
    private ticketService: TicketService,
    private helperService: HelperService,
    private popVerCtrl: PopoverController) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTickets();
    this.permisoCerrado = false;
    this.permisoAbierto = false;
  }

  ngOnInit() {
    this.initTickets();
    this.permisoCerrado = false;
    this.permisoAbierto = false;
  }

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true,
      ticketModificado: this.elTicket
    });
  }

  segmentChange(event: any) {
    this.tabActivo = event.detail.value;
    console.log('Que tab es:', this.tabActivo);
  }

  async mostrarDetalleMenu(evento){
    const popover = await this.popVerCtrl.create({
      component: MenuDetalleCasoComponent,
      componentProps: {
        elEstatus: this.elTicket.estatus,
        elRolUsuario: this.elRolUsuario
      },
      event: evento,
      cssClass: 'my-custom-class',
      mode: 'ios',
      backdropDismiss: true,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data !== undefined) {
      switch (data) {
        case 'intervenir-ticket':
          this.intervenirCasoModal(this.elTicket);
          break;
        case 'reabrir-ticket':
          this.reabrirCasoModal(this.elTicket);
          break;
        case 'cerrar-caso':
          this.cerrarCasoModal(this.elTicket);
          break;
        default:
          break;
      }
    }
  }

  async reabrirCasoModal(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon: 'help-circle-outline',
          titleWindow: 'Reabrir Caso',
          titleMessage: 'Reabrir caso',
          txtMessage: 'Escriba aquí ¿Por qué reabrió el caso?',
          titleErr: 'Reabrir caso',
          messageErr: 'Por favor escriba un motivo.'
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onReabrirCaso(ticketSelected, data.motivo);
    }
  }

  async intervenirCasoModal(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon: 'help-circle-outline',
          titleWindow: 'Intervenir Caso',
          titleMessage: 'Escriba aqui las acciones que realizó',
          txtMessage: 'Escriba aqui las acciones que realizó',
          titleErr: 'Nueva intervención',
          messageErr: 'Escriba una intervención'
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onIntervenirCaso(ticketSelected, data.motivo, data.esCerrarCaso);
    }
  }

  async cerrarCasoModal(ticketSelected: TicketResponse) {

    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon: 'chatbox-outline',
          titleWindow: 'Cerrar Caso',
          titleMessage: '¿Está seguro que desea Cerrar el Caso?',
          txtMessage: 'Escriba aquí el motivo',
          titleErr: '¿Motivo?',
          messageErr: 'Por favor escriba el motivo'
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onCerrarCaso(ticketSelected, data.motivo, data.esCerrarCaso);
    }
  }

  async onCerrarCaso(ticketSelected: TicketResponse, elMotivo: string, cerrarCaso: boolean) {

    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.guidEmpty,
      observaciones: elMotivo,
      activo: true,
      esCerrarCaso: cerrarCaso
    };

    this.helperService.showLoading('Cerrando caso...', 'bubbles');
    this.ticketService.cerrar(elNuevoStatusTicket).subscribe((exito: TicketApiResponse) => {

      if (exito.result === 'OK') {
        // actualizar ticket
        this.elTicket = exito.dtoResult;
        this.initTickets();

        Swal.fire({
          icon: 'success',
          title: 'Cerrar Caso',
          text: `${exito.message}`,
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

      this.helperService.hideLoading();

    }, (err) => {
      console.log(err);
      this.helperService.hideLoading();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error de comunicación, reinténtelo nuevamente.',
        heightAuto: false
      });
    });
  }

  async onIntervenirCaso(ticketSelected: TicketResponse, elMotivo: string, cerrarCaso: boolean) {

    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true,
      esCerrarCaso: cerrarCaso
    };

    this.helperService.showLoading('Actualizando el caso...', 'bubbles');
    this.ticketService.intervenir(elNuevoStatusTicket).subscribe((exito: TicketApiResponse) => {

      if (exito.result === 'OK') {

        //VMP vamos a notificar el cambio 
        this.salidaTicketCambiado.emit(true);
        console.log('SE VA A NOTIFICAR EL CAMBIO')
        this.elTicket = exito.dtoResult;
        this.initTickets();

        Swal.fire({
          icon: 'success',
          title: 'Atendiendo Caso',
          text: `${exito.message}`,
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atendiendo Caso',
          text: exito.error,
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      }

      this.helperService.hideLoading();

    }, (err) => {

      this.helperService.hideLoading();
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error de comunicación, reinténtelo nuevamente.',
        heightAuto: false
      });
    });

  }

  async onReabrirCaso(ticketSelected: TicketResponse, elMotivo: string) {
    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusReabierto,
      observaciones: elMotivo,
      activo: true
    };

    this.helperService.showLoading('Reabriendo caso...', 'bubbles');
    this.ticketService.reabrir(elNuevoStatusTicket).subscribe((exito: TicketApiResponse) => {

      if (exito.result === 'OK') {

        this.elTicket = exito.dtoResult;
        this.initTickets();

        Swal.fire({
          icon: 'success',
          title: 'Reabrir Caso',
          text: `${exito.message}`,
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Reabrir Caso',
          text: exito.error,
          heightAuto: false
        }).then((result) => {
          if (result.isConfirmed) {
            // algo
          }
        });
      }

      this.helperService.hideLoading();

    }, (err) => {

      this.helperService.hideLoading();
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error de comunicación, reinténtelo nuevamente.',
        heightAuto: false
      });
    });
  }

  onTienePermisoReabrir(elTicket: TicketResponse): boolean {
    const resultado = (elTicket.estatus.estatusId.toUpperCase() === environment.estatusCerradoCorpo
      || elTicket.estatus.estatusId.toUpperCase() === environment.estatusCerradoTienda)
      && (this.elRolUsuario === environment.corp || this.elRolUsuario === environment.admin);

    if (resultado) {
      this.permisoAbierto = true;
    }

    return resultado;
  }

  onTienePermisoCerrado(elTicket: TicketResponse): boolean {

    const resultado = (elTicket.estatus.estatusId.toUpperCase() === environment.estatusAtendido
      || elTicket.estatus.estatusId.toUpperCase() === environment.estatusReabierto)
      && (this.elRolUsuario === environment.corp || this.elRolUsuario === environment.admin || this.elRolUsuario === environment.tda);

    if (resultado) {
      this.permisoCerrado = true;
    }

    return resultado;
  }

  initTickets() {
    this.losticketLogs = this.elTicket.ticketLogs.sort((a,b) => (a.fechaAlta > b.fechaAlta) ? 1 : -1);
  }
}
