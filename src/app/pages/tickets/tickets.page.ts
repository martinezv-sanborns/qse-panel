
import { Component, OnDestroy, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';

// controllers
import { ModalController, PopoverController } from '@ionic/angular';

// globals
import { environment } from 'src/environments/environment';

// components
import { DetalleTicketComponent } from 'src/app/components/ticket/detalle-ticket/detalle-ticket.component';
import { MenuTicketComponent } from 'src/app/components/ticket/menu-ticket/menu-ticket.component';
import { EstatusMotivoTicketComponent } from 'src/app/components/ticket/estatus-motivo-ticket/estatus-motivo-ticket.component';

// services
import { CatalogoService } from 'src/app/services/catalogo.service';
import { HelperService } from 'src/app/services/helper.service';
import { TicketService } from 'src/app/services/ticket.service';

// models
import { EstatusApiResponse, EstatusResponse } from '../../models/response/estatus.model';
import { TipoApiResponse, TipoResponse } from '../../models/response/tipo.model';
import { TicketApiResponse, TicketResponse, TicketsApiResponse } from 'src/app/models/response/ticket.model';
import { TicketStatusRequest } from 'src/app/models/request/ticket.model';
import { TiendaService } from '../../services/tienda.service';
import { TiendasApiResponse, TiendaResponse } from '../../models/response/tiendaresponse.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit, OnDestroy {

  listadoTickets: TicketResponse[] = [];
  cargando: boolean;
  lacadenaSelectedId: string;
  losEstatus: EstatusResponse[] = [];
  losTipos: TipoResponse[] = [];
  lasTiendasUser: TiendaResponse[] = [];
  elEstatusIdSeleccionado = '';
  elTipoIdSeleccionado = '';
  laTiendaSeleccionadaId = '';
  losFiltrosOk = '';
  elRolUser = '';
  filtrosFinales: string[] = [];
  elFiltroEstablecido = '';
  losFiltros = {};
  paginaActual: number;
  totalPaginasArray: number[] = [];
  totalRegistros: number;
  noPaginas: number;

  dateFechaIni = '';
  dateFechaFin = '';
  activePage = 0;
  subscriptionListadoTickets: Subscription;

  constructor(private catalogoService: CatalogoService,
    private ticketService: TicketService,
    private helperService: HelperService,
    private tiendaService: TiendaService,
    private popVerCtrl: PopoverController,
    private modalCtrl: ModalController,
    private modalCrtl: ModalController
  ) { }

  ngOnDestroy(): void {
   this.subscriptionListadoTickets.unsubscribe();
  }

  ngOnInit() {

    this.lacadenaSelectedId = localStorage.getItem('cadenaSelectedId');
    this.elRolUser = localStorage.getItem('rolName');
    this.obtenerTiendas();

    this.getTickets();
    this.obtenerEstatus();
    this.obtenerTipo();
  }


  getTickets() {
    this.listadoTickets = [];
    this.cargando = true;
    this.helperService.showLoading('Espere un momento, estamos cargando los casos', 'bubbles');
    this.subscriptionListadoTickets = this.ticketService
    .obtenerTicketsListado(this.lacadenaSelectedId, 1, environment.tamPagina)
      .subscribe((exito: TicketsApiResponse) => {
      this.helperService.hideLoading();
      console.log('close loading');
      if (exito.result === 'OK') {
        this.listadoTickets = exito.dtoResult;
        this.paginaActual = exito.paginaActual;
        this.totalPaginasArray = new Array((exito.totalPaginas > 10 ? 10 : exito.totalPaginas));
        this.totalRegistros = exito.totalRegistros;
        this.noPaginas = exito.totalPaginas;
      }
      this.cargando = false;

    }, (errr) => {
      this.cargando = false;
      console.log(errr);
      this.helperService.hideLoading();
    });
  }

  onSearchChange(event) {
    this.elFiltroEstablecido = event.detail.value;
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  async mostrarMenu(evento, ticketSelected: TicketResponse) {

    const popover = await this.popVerCtrl.create({
      component: MenuTicketComponent,
      componentProps: {
        elEstatus: ticketSelected.estatus,
        elRolUsuario: this.elRolUser
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
        case 'detalle-ticket':
          this.verDetalleTicket(ticketSelected);
          break;
        case 'atender-ticket':
          this.atenderCasoModal(ticketSelected);
          break;
        case 'intervenir-ticket':
          this.intervenirModal(ticketSelected);
          break;
        case 'reabrir-ticket':
          this.reabrirCasoModal(ticketSelected);
          break;
        case 'cerrar-caso':
          this.cerrarCasoModal(ticketSelected);
          break;
        case 'close-menu':
          break;
        default:
          break;
      }
    }
  }

  async onFechaFinSelected(event) {
    this.dateFechaFin = this.formatDate(event.detail.value);
    this.modalCtrl.dismiss({});

    if (this.dateFechaIni === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha inicio',
        text: 'Primero seleccione una fecha de inicio',
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          // algo
        }
      });

      return;
    }

    if (this.dateFechaIni > this.dateFechaFin) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha inicio',
        text: 'La fecha de inicio no puede ser mayor a la fecha fin',
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          // algo
        }
      });


      return;
    }

    // ejecutar filtros
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  async verDetalleTicket(ticketSelected: TicketResponse) {
    const modalShowTicket = await this.modalCtrl.create(
      {
        component: DetalleTicketComponent,
        componentProps: {
          elTicket: ticketSelected,
          elRolUsuario: this.elRolUser,
          isModal: true
        },
        backdropDismiss: false
      }
    );
    await modalShowTicket.present();

    const { data } = await modalShowTicket.onWillDismiss();
    const indexTicket = this.listadoTickets.findIndex(t => t.ticketId === data.ticketModificado.ticketId);
    this.listadoTickets[indexTicket] = data.ticketModificado;
  }

  async intervenirModal(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon: 'help-circle-outline',
          titleWindow: 'Intervenir Caso',
          txtMessage: 'Escriba aqui las acciones que realizó',
          titleErr: 'Nueva intervención',
          messageErr: 'Escriba una intervención',
          accion: 'intervenir',
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
          txtMessage: 'Escriba aquí el motivo',
          titleErr: '¿Motivo?',
          messageErr: 'Por favor escriba el motivo',
          accion: 'cerrar',
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onCerrarCaso(ticketSelected, data.motivo, data.esCerrarCaso);
    }
  }

  async atenderCasoModal(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon: 'help-circle-outline',
          titleWindow: 'Atender Caso',
          txtMessage: 'Escriba aquí su observación:',
          titleErr: 'Nueva observación',
          messageErr: 'Escriba una observación',
          accion: 'atender',
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onAtenderCaso(ticketSelected, data.motivo);
    }
  }

  async reabrirCasoModal(ticketSelected: TicketResponse) {
    const modalShow = await this.modalCrtl.create(
      {
        component: EstatusMotivoTicketComponent,
        componentProps: {
          icon: 'help-circle-outline',
          titleWindow: 'Reabrir Caso',
          txtMessage: 'Escriba aquí ¿Por qué reabrió el caso?',
          titleErr: 'Reabrir caso',
          messageErr: 'Por favor escriba un motivo.',
          accion: 'reabrir',
        }
      });
    await modalShow.present();
    const { data } = await modalShow.onWillDismiss();

    if (data.motivoSend) {
      this.onReabrirCaso(ticketSelected, data.motivo);
    }
  }

  async onCerrarCaso(ticketSelected: TicketResponse, elMotivo: string, cerrarCaso: boolean) {
    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true,
      esCerrarCaso: cerrarCaso
    };

    this.helperService.showLoading('Cerrando caso...', 'bubbles');
    this.ticketService.cerrar(elNuevoStatusTicket).subscribe((exito: TicketApiResponse) => {

      if (exito.result === 'OK') {
        // actualizar estatatus en el listado
        const ticketIndex = this.listadoTickets.findIndex(e => e.ticketId === exito.dtoResult.ticketId);
        this.listadoTickets[ticketIndex] = exito.dtoResult;

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

  async onIntervenirCaso(ticketSelected: TicketResponse, elMotivo: string, cerrarCaso: boolean) {

    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true,
      esCerrarCaso: cerrarCaso
    };

    this.helperService.showLoading('Interviniendo...', 'bubbles');
    this.ticketService.intervenir(elNuevoStatusTicket).subscribe((exito) => {

      if (exito.result === 'OK') {
        // actualizar estatatus en el listado
        const ticketIndex = this.listadoTickets.findIndex(e => e.ticketId === exito.dtoResult.ticketId);
        this.listadoTickets[ticketIndex] = exito.dtoResult;

        Swal.fire({
          icon: 'success',
          title: 'Intervenir Caso',
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
          title: 'Intervenir Caso',
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

  async onAtenderCaso(ticketSelected: TicketResponse, elMotivo: string) {

    const elNuevoStatusTicket: TicketStatusRequest = {
      ticketId: ticketSelected.ticketId,
      estatusId: environment.estatusAtendido,
      observaciones: elMotivo,
      activo: true
    };

    this.helperService.showLoading('Atendiendo...', 'bubbles');
    this.ticketService.intervenir(elNuevoStatusTicket).subscribe((exito) => {

      if (exito.result === 'OK') {
        // actualizar estatatus en el listado
        const ticketIndex = this.listadoTickets.findIndex(e => e.ticketId === exito.dtoResult.ticketId);
        this.listadoTickets[ticketIndex] = exito.dtoResult;

        Swal.fire({
          icon: 'success',
          title: 'Atender Caso',
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
          title: 'Atender Caso',
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
        // actualizar estatatus en el listado
        const ticketIndex = this.listadoTickets.findIndex(e => e.ticketId === exito.dtoResult.ticketId);
        this.listadoTickets[ticketIndex] = exito.dtoResult;

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

  getTicketsFiltro(cadenaId: string, filtros: string, numberPage: number, pageSize: number) {
    this.listadoTickets = [];
    this.helperService.showLoading('Espere un momento, estamos cargando los casos', 'bubbles');
    this.cargando = true;
    this.ticketService.obtenerTicketsFiltro(cadenaId, filtros, numberPage, pageSize)
      .subscribe((exito: TicketsApiResponse) => {
        this.cargando = false;
        this.helperService.hideLoading();

        if (exito.result === 'OK') {

          this.listadoTickets = exito.dtoResult;
          this.paginaActual = exito.paginaActual;
          this.totalPaginasArray = new Array((exito.totalPaginas > 10 ? 10 : exito.totalPaginas));
          this.totalRegistros = exito.totalRegistros;
          this.noPaginas = exito.totalPaginas;
        }
      },
        (err) => {
          this.helperService.hideLoading();
          this.cargando = false;
          console.log(err);
        });
  }

  obtenerEstatus() {
    this.catalogoService.obtenerEstatus(1, 100).subscribe(
      (exito: EstatusApiResponse) => {
        //console.log('Los Estatus', exito)
        this.losEstatus = exito.dtoResult;
        const estatusTodos: EstatusResponse = {
          estatusId: '0',
          nombre: 'Todos los estatus',
          nombreCorto: 'Todos',
          iconName: 'search-outline'
        };
        this.losEstatus.unshift(estatusTodos);
      },
      (error) => { }
    );
  }

  obtenerTipo() {
    this.catalogoService.obtenerTipos(1, 100).subscribe(
      (exito: TipoApiResponse) => {
        //console.log('Los Tipos', exito)
        this.losTipos = exito.dtoResult;
        const tiposTodos: TipoResponse = {
          tipoId: 0,
          nombre: 'Todos los tipos',
          nombreCorto: 'Todos',
          iconName: 'search-outline'
        };
        this.losTipos.unshift(tiposTodos);
      },
      (error) => { }
    );
  }

  cambiarPagina(pagina: number) {

    if (pagina > this.noPaginas) {
      this.paginaActual = this.noPaginas;
    } else {
      this.paginaActual = pagina;
    }

    this.activePage = (pagina) - 1;

    // Consultar listado siguiente
    this.ejecutarFiltros(environment.tamPagina, this.paginaActual);
  }

  onChangeEstatus(estatusSelected: number) {
    this.elEstatusIdSeleccionado = estatusSelected.toString();
    // ejecutar filtros
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  onChangeTipo(tipoId: number) {
    this.elTipoIdSeleccionado = tipoId.toString();
    // ejecutar filtros
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  onChangeTienda(tiendaId: string) {
    this.laTiendaSeleccionadaId = tiendaId;
    // ejecutar filtros
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  ejecutarFiltros(tamPagina: number, paginaActual: number) {
    this.losFiltrosOk = '';
    this.filtrosFinales = [];

    if(this.laTiendaSeleccionadaId.trim().length>0){
      this.filtrosFinales.push(`'tiendaId':'${this.laTiendaSeleccionadaId}'`);
    }

    if (this.elEstatusIdSeleccionado.trim().length > 0) {
      this.filtrosFinales.push(`'estatus':'${this.elEstatusIdSeleccionado}'`);
    }

    if (this.elTipoIdSeleccionado.trim().length > 0) {
      this.filtrosFinales.push(`'tipo':'${this.elTipoIdSeleccionado}'`);
    }

    if (this.elFiltroEstablecido.trim().length >= 3) {
      this.filtrosFinales.push(`'nombretienda':'${this.elFiltroEstablecido}'`);
    }

    if (this.elFiltroEstablecido.trim().length >= 3) {
      this.filtrosFinales.push(`'numerotienda':'${this.elFiltroEstablecido}'`);
    }

    if (this.elFiltroEstablecido.trim().length >= 3) {
      this.filtrosFinales.push(`'folio':'${this.elFiltroEstablecido}'`);
    }

    if (this.dateFechaIni !== '' && this.dateFechaFin !== '') {
      this.filtrosFinales.push(`'fechaAltaInicio':'${this.dateFechaIni}'`);
      this.filtrosFinales.push(`'fechaAltaFin':'${this.dateFechaFin}'`);
    }

    this.filtrosFinales.forEach((filtro, index) => {
      this.losFiltrosOk = this.losFiltrosOk + filtro + ',';
    });

    if (this.losFiltrosOk !== '') {
      const resultado = `{${this.losFiltrosOk.substring(0, this.losFiltrosOk.length - 1)}}`;
      this.getTicketsFiltro(this.lacadenaSelectedId, resultado, paginaActual, tamPagina);
    }
    else {
      this.losFiltros = {
        todos: 'OK'
      };
      const resultado = JSON.stringify(this.losFiltros);
      this.getTicketsFiltro(this.lacadenaSelectedId, resultado, paginaActual, tamPagina);
    }

  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd-MM-yyyy');
  }

  onFechaIniSelected(event) {
    this.dateFechaIni = this.formatDate(event.detail.value);
    this.modalCtrl.dismiss({});
  }

  obtenerTiendas() {
    this.tiendaService.obtenerTiendasUsuario().subscribe((exito: TiendasApiResponse) => {
      if (exito.result === 'OK') {
        this.lasTiendasUser = exito.dtoResult;
        const todasTiendas: TiendaResponse = {
          tiendaId: '',
          nombre: 'Todas las tiendas',
          nombreCorto: 'Todos',
          iconName: 'search-outline',
          identificadorExterno: '',
          coordenadas: '',
          apertura: '',
          cierre: '',
          utm: '',
          diasOperacion: '',
          email: '',
          cadena: [],
          fechaAlta: undefined,
          fechaModificacion: undefined,
          activo: false
        };
        this.lasTiendasUser.unshift(todasTiendas);

        console.log(this.lasTiendasUser.length);

        if(this.lasTiendasUser.length === 2){
          this.laTiendaSeleccionadaId =  this.lasTiendasUser[1].tiendaId;
        }
      }
    }, (err) => {
      console.log('error al obtener tiendas', err);
    });
  }
}
