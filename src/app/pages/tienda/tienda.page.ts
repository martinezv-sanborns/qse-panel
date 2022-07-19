import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { CrearTiendaComponent } from 'src/app/components/tienda/crear-tienda/crear-tienda.component';
import { DetalleTiendaComponent } from 'src/app/components/tienda/detalle-tienda/detalle-tienda.component';
import { MenuTiendaComponent } from 'src/app/components/tienda/menu-tienda/menu-tienda.component';
import { TiendaActivaRequest } from 'src/app/models/request/tienda.model';
import { TiendaApiResponse, TiendaResponse, TiendasApiResponse } from 'src/app/models/response/tiendaresponse.model';
import { HelperService } from 'src/app/services/helper.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  cargando: boolean;
  listadoTiendas: TiendaResponse[] = [];
  losFiltrosOk = '';
  filtrosFinales: string[] = [];
  elFiltroEstablecido = '';
  losFiltros = {};
  paginaActual: number;
  noPaginas: number;
  activePage = 0;
  totalPaginasArray: number[] = [];
  lacadenaSelectedId: string;
  totalRegistros: number;

  constructor(private tiendaService: TiendaService,  private popVerCtrl: PopoverController, private alertCtrl: AlertController,
    private helperService: HelperService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.lacadenaSelectedId = localStorage.getItem('cadenaSelectedId');

    this.getTiendas();
  }



  getTiendas() {
    this.listadoTiendas = [];
    this.cargando = true;
    this.tiendaService.obtenerTiendas(this.lacadenaSelectedId, 1, environment.tamPagina).subscribe((exito: TiendasApiResponse) => {

      if (exito.result === 'OK') {
        this.listadoTiendas = exito.dtoResult;
        this.paginaActual = exito.paginaActual;
        this.totalPaginasArray = new Array((exito.totalPaginas > 10 ? 10 : exito.totalPaginas));
        this.totalRegistros = exito.totalRegistros;
        this.noPaginas = exito.totalPaginas;

        console.log('el listado de tiendas', this.listadoTiendas);

      }
      this.cargando = false;
    }, (errr) => {
      this.cargando = false;
      console.log(errr);
    });
  }

  onSearchChange(event) {
    this.elFiltroEstablecido = event.detail.value;
    this.ejecutarFiltros(environment.tamPagina, 1);
  }

  async mostrarMenu(evento, tiendaSelected: TiendaResponse) {
    const popover = await this.popVerCtrl.create({
      component: MenuTiendaComponent,
      componentProps: {
        esActivo: tiendaSelected.activo
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
        case 'detalle-tienda':
          this.detalleTienda(tiendaSelected);
          break;
        case 'edit-user':
          //this.editTienda(tiendaSelected);
          break;
        case 'activar-tienda':
          this.changeStatusTienda(tiendaSelected, true);
          break;
        case 'desactivar-tienda':
          this.changeStatusTienda(tiendaSelected, false);
          break;
        case 'delete-tienda':
          //this.deleteTienda(tiendaSelected);
          break;
        case 'close-menu':
          break;
        default:
          break;
      }
    }
  }

  
  async changeStatusTienda(laTienda: TiendaResponse, status: boolean) {

    const alertDelete = await this.alertCtrl.create({
      cssClass: 'question-alert',
      header: `${status === true ? 'Activar tienda' : 'Desactivar tienda'}`,
      message: this.helperService.getMessageAlert(`¿Está seguro de que desea ${status === true ? 'activar' : 'desactivar'}
      la tienda ${laTienda.nombre}?`, 'question'),
      buttons: [
        {
          text: 'Estoy seguro',
          id: 'confirm-button',
          cssClass: 'okButton',
          handler: () => {

            const tiendaChange: TiendaActivaRequest = {
              tiendaId: laTienda.tiendaId,
              esActivo: status,
            };

            this.tiendaService.cambiarActivo(tiendaChange).subscribe(async (exito: TiendaApiResponse) => {

              if (exito.result === 'OK') {

                laTienda.activo = status;

                // show alert success
                const alertSuccess = await this.alertCtrl.create({
                  cssClass: 'alertSuccess',
                  message: this.helperService.getMessageAlert(`La tienda ${laTienda.nombre}
                  fue ${status === true ? 'activado' : 'desactivado'} correctamente.`, 'success'),
                  animated: true,
                  buttons: [
                    {
                      text: 'Aceptar',
                      cssClass: 'alertButton',
                      id: 'confirm-button',
                      handler: () => {
                      }
                    }]
                });

                await alertSuccess.present();

                const { data } = await alertSuccess.onDidDismiss();

              }
            },
              (error) => {
                console.log(error);
              });

          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancelButton',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alertDelete.present();

  }

  ejecutarFiltros(tamPagina: number, paginaActual: number) {
    this.losFiltrosOk = '';
    this.filtrosFinales = [];


    if (this.elFiltroEstablecido.trim().length >= 3) {
      this.filtrosFinales.push(`'nombretienda':'${this.elFiltroEstablecido}'`);
    }

    if (this.elFiltroEstablecido.trim().length >= 3) {
      this.filtrosFinales.push(`'numerotienda':'${this.elFiltroEstablecido}'`);
    }

    this.filtrosFinales.forEach((filtro, index) => {
      this.losFiltrosOk = this.losFiltrosOk + filtro + ',';
    });

    if (this.losFiltrosOk !== '') {
      const resultado = `{${this.losFiltrosOk.substring(0, this.losFiltrosOk.length - 1)}}`;
      this.getTiendasFiltro(this.lacadenaSelectedId, resultado, paginaActual, tamPagina);
    }
    else {
      this.losFiltros = {
        todos: 'OK'
      };
      const resultado = JSON.stringify(this.losFiltros);
      console.log('JSON', resultado);
      this.getTiendasFiltro(this.lacadenaSelectedId, resultado, paginaActual, tamPagina);
    }

  }

  getTiendasFiltro(cadenaId: string, filtros: string, numberPage: number, pageSize: number) {
    this.cargando = true;
    this.tiendaService.obtenerTiendasFiltro(cadenaId, filtros, numberPage, pageSize)
      .subscribe((exito: TiendasApiResponse) => {
        this.cargando = false;
        //this.spinnerService.setTitulo = '';

        if (exito.result === 'OK') {

          console.log('Tiendas Filtro', exito.dtoResult);

          this.listadoTiendas = exito.dtoResult;
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

  async crearTienda() {

    const modalRegisterUser = await this.modalCtrl.create(
      {
        component: CrearTiendaComponent,
        backdropDismiss: false,
        componentProps: {
          //itle: ''
        }
      }
    );
    await modalRegisterUser.present();
    const { data } = await modalRegisterUser.onWillDismiss();

    if (data.registrado) {
      this.listadoTiendas .unshift(data.nuevo);
    }
  }

  async detalleTienda(tiendaSelected: TiendaResponse) {
    const modalShowTienda = await this.modalCtrl.create(
      {
        component: DetalleTiendaComponent,
        componentProps: {
          laTienda: tiendaSelected,
        },
        backdropDismiss: false
      }
    );
    await modalShowTienda.present();


    const { data } = await modalShowTienda.onWillDismiss();

  }
}
