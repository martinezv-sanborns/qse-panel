
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { DetalleTicketComponent } from 'src/app/components/ticket/detalle-ticket/detalle-ticket.component';
import { MenuTicketComponent } from 'src/app/components/ticket/menu-ticket/menu-ticket.component';
import { EstatusApiResponse } from 'src/app/models/response/estatus.model';
import { TicketResponse, TicketsApiResponse } from 'src/app/models/response/ticket.model';
import { TipoApiResponse } from 'src/app/models/response/tipo.model';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { HelperService } from 'src/app/services/helper.service';
import { TicketService } from 'src/app/services/ticket.service';
import { environment } from 'src/environments/environment';
import { EstatusResponse } from '../../models/response/estatus.model';
import { TipoResponse } from '../../models/response/tipo.model';
import { TicketTipoResponse } from '../../models/response/ticket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  listadoTickets: TicketResponse[] = [];
  cargando: boolean;
  cadenaId: string = '133D338D-D69C-4538-8140-18A8B41F4AD9';
  LosEstatus:EstatusResponse[]=[];
  LosTipos:TipoResponse[]=[];
  elEstatusIdSeleccionado = '';
  losFiltrosOk = '';
  filtrosFinales: string[] = [];
  elFiltroEstablecido = '';
  losFiltros = {};
  paginaActual: number;
  totalPaginasArray: number[] = [];
  totalRegistros: number;
  noPaginas: number;

  dateFechaIni = '';
  dateFechaFin = '';

  constructor( private catalogoService: CatalogoService, private ticketService: TicketService, 
    private popVerCtrl: PopoverController, private modalCtrl: ModalController,private alertCtrl: AlertController,
    private helperService: HelperService ) { }

  ngOnInit() {

      this. getTickets();
      this.ObtenerEstatus();
      this.ObtenerTipo();

      for (let item of this.listadoTickets) {
        if (item.ticketTipos) {
            return;
        }

        console.log('Tiposs', item.ticketTipos);
    } 
  }


  getTickets() {
    this.listadoTickets = [];
    this.ticketService.obtenerTicketsListado(this.cadenaId,1, 1000).subscribe((exito: TicketsApiResponse) => {

      if (exito.result === 'OK') {
        this.listadoTickets = exito.dtoResult;
        console.log(exito.dtoResult);

      }
    }, (errr) => {
      console.log(errr);
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
        elEstatus: ticketSelected.estatus
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
        case 'intervenido-ticket':
          // this.atenderSolicitud(ordenSelected);
          break;
        case 'cerradocorporativo-ticket':
          // this.autorizarSolicitud(ordenSelected);
          break;
        case 'cerradotienda-ticket':
          // this.mostrarModalRechazarSolicitud(ordenSelected);
          break;
        case 'atendido-ticket':
          // this.mostrarModalCancelarSolicitud(ordenSelected);
          break;
        case 'close-menu':
          break;
          case 'detalle-ticket':
            this.verDetalleTicket(ticketSelected);
            break;
        default:
          break;
      }
    }
  }

  ObtenerEstatus(){
    this.catalogoService.obtenerEstatus(1,100).subscribe(
      (exito:EstatusApiResponse)=>{
          //console.log('Los Estatus', exito)
          this.LosEstatus = exito.dtoResult;
      },
      (error)=>{}
  );
  }

  ObtenerTipo(){
    this.catalogoService.obtenerTipos(1,100).subscribe(
      (exito:TipoApiResponse)=>{
          //console.log('Los Tipos', exito)
          this.LosTipos = exito.dtoResult;
      },
      (error)=>{}
  );
  }

  onChangeEstatus(estatusSelected: number) {

     this.elEstatusIdSeleccionado = estatusSelected.toString();

    // ejecutar filtros
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd-MM-yyyy');
  }

  onFechaIniSelected(event) {
    this.dateFechaIni = this.formatDate(event.detail.value);
    this.modalCtrl.dismiss({});
  }


  async onFechaFinSelected(event) {
    this.dateFechaFin = this.formatDate(event.detail.value);
    this.modalCtrl.dismiss({});

    if (this.dateFechaIni === '') {
      const alertMsj = await this.alertCtrl.create({
        cssClass: 'alertDanger',
        message: this.helperService.getMessageAlert(`Primero seleccione una fecha de inicio`, 'danger'),
        buttons: [
          {
            text: 'Aceptar',
            cssClass: 'alertButton',
            id: 'confirm-button',
            handler: () => {
            }
          }]
      });

      await alertMsj.present();
      return;
    }

    if (this.dateFechaIni > this.dateFechaFin) {
      const alertMsj = await this.alertCtrl.create({
        cssClass: 'alertDanger',
        message: this.helperService.getMessageAlert(`La fecha de inicio no puede ser mayor a la fecha fin`, 'danger'),
        buttons: [
          {
            text: 'Aceptar',
            cssClass: 'alertButton',
            id: 'confirm-button',
            handler: () => {
            }
          }]
      });

      await alertMsj.present();
      return;
    }

    // ejecutar filtros
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  async verDetalleTicket(ticketSelected: TicketResponse) {
    const modalShowPortal = await this.modalCtrl.create(
      {
        component: DetalleTicketComponent,
        componentProps: {
          elTicket: ticketSelected
        }
      }
    );
    await modalShowPortal.present();
    const { data } = await modalShowPortal.onWillDismiss();
  }

  ejecutarFiltros(tamPagina: number, paginaActual: number) {
    this.losFiltrosOk = '';
    this.filtrosFinales = [];

    if (this.elEstatusIdSeleccionado.trim().length > 0) {
      this.filtrosFinales.push(`'estatus':'${this.elEstatusIdSeleccionado}'`);
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
      this.getTicketsFiltro(this.cadenaId, resultado, paginaActual, tamPagina);
    }
    else {
      this.losFiltros = {
        todos: 'OK'
      };
      const resultado = JSON.stringify(this.losFiltros);
      this.getTicketsFiltro(this.cadenaId, resultado, paginaActual, tamPagina);
    }

  }

  getTicketsFiltro(cadenaId: string, filtros: string, numberPage: number, pageSize: number) {
    //this.spinnerService.setTitulo = 'Espere un momento, estamos cargando las tickets';
    this.cargando = true;
    this.ticketService.obtenerTicketsFiltro(cadenaId, filtros, numberPage, pageSize)
      .subscribe((exito: TicketsApiResponse) => {
        this.cargando = false;
        //this.spinnerService.setTitulo = '';

        if (exito.result === 'OK') {

          console.log('Tickets Filtro', exito.dtoResult);

          this.listadoTickets = exito.dtoResult;
          this.paginaActual = exito.paginaActual;
          this.totalPaginasArray = new Array((exito.totalPaginas > 10 ? 10 : exito.totalPaginas));
          this.totalRegistros = exito.totalRegistros;
          this.noPaginas = exito.totalPaginas;
        }
      },
        (err) => {
          //this.spinnerService.setTitulo = '';
          this.cargando = false;
          console.log(err);
        });
  }

}
