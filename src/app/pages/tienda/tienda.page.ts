import { Component, OnInit } from '@angular/core';
import { TiendaResponse, TiendasApiResponse } from 'src/app/models/response/tiendaresponse.model';
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

  constructor(private tiendaService: TiendaService) { }

  ngOnInit() {
    //this.lacadenaSelectedId = localStorage.getItem('cadenaSelectedId');
    this.lacadenaSelectedId = '133D338D-D69C-4538-8140-18A8B41F4AD9';

    this.getTiendas();
  }



  getTiendas() {
    this.listadoTiendas = [];
    this.cargando = true;
    this.tiendaService.obtenerTiendas(this.lacadenaSelectedId, 1, environment.tamPagina).subscribe((exito: TiendasApiResponse) => {

      if (exito.result === 'OK') {
        this.listadoTiendas = exito.dtoResult;
        // this.paginaActual = exito.paginaActual;
        // this.totalPaginasArray = new Array((exito.totalPaginas > 10 ? 10 : exito.totalPaginas));
        // this.totalRegistros = exito.totalRegistros;
        // this.noPaginas = exito.totalPaginas;

        console.log('el listado de tiendas', this.listadoTiendas);

      }
      //this.cargando = false;
    }, (errr) => {
      this.cargando = false;
      console.log(errr);
    });
  }

  // onSearchChange(event) {
  //   this.elFiltroEstablecido = event.detail.value;
  //   this.ejecutarFiltros(environment.tamPagina, 1);
  // }
  // async mostrarMenu(evento, tiendaSelected: TiendaResponse) {
  // }

  // ejecutarFiltros(tamPagina: number, paginaActual: number) {
  //   this.losFiltrosOk = '';
  //   this.filtrosFinales = [];


  //   if (this.elFiltroEstablecido.trim().length >= 3) {
  //     this.filtrosFinales.push(`'nombretienda':'${this.elFiltroEstablecido}'`);
  //   }

  //   if (this.elFiltroEstablecido.trim().length >= 3) {
  //     this.filtrosFinales.push(`'numerotienda':'${this.elFiltroEstablecido}'`);
  //   }

  //   this.filtrosFinales.forEach((filtro, index) => {
  //     this.losFiltrosOk = this.losFiltrosOk + filtro + ',';
  //   });

  //   if (this.losFiltrosOk !== '') {
  //     const resultado = `{${this.losFiltrosOk.substring(0, this.losFiltrosOk.length - 1)}}`;
  //     this.getTiendasFiltro(this.lacadenaSelectedId, resultado, paginaActual, tamPagina);
  //   }
  //   else {
  //     this.losFiltros = {
  //       todos: 'OK'
  //     };
  //     const resultado = JSON.stringify(this.losFiltros);
  //     console.log('JSON', resultado);
  //     this.getTiendasFiltro(this.lacadenaSelectedId, resultado, paginaActual, tamPagina);
  //   }

  // }

  // getTiendasFiltro(cadenaId: string, filtros: string, numberPage: number, pageSize: number) {
  //   this.cargando = true;
  //   this.tiendaService.obtenerTiendasFiltro(cadenaId, filtros, numberPage, pageSize)
  //     .subscribe((exito: TiendasApiResponse) => {
  //       this.cargando = false;
  //       //this.spinnerService.setTitulo = '';

  //       if (exito.result === 'OK') {

  //         console.log('Tiendas Filtro', exito.dtoResult);

  //         this.listadoTiendas = exito.dtoResult;
  //         this.paginaActual = exito.paginaActual;
  //         this.totalPaginasArray = new Array((exito.totalPaginas > 10 ? 10 : exito.totalPaginas));
  //         this.totalRegistros = exito.totalRegistros;
  //         this.noPaginas = exito.totalPaginas;
  //       }
  //     },
  //       (err) => {
  //         //this.spinnerService.setTitulo = '';
  //         this.cargando = false;
  //         console.log(err);
  //       });
  // }
  
  // cambiarPagina(pagina: number) {

  //   if (pagina > this.noPaginas) {
  //     this.paginaActual = this.noPaginas;
  //   } else {
  //     this.paginaActual = pagina;
  //   }

  //   this.activePage = (pagina) - 1;

  //   // Consultar listado siguiente
  //   this.ejecutarFiltros(environment.tamPagina, this.paginaActual);
  // }
}
