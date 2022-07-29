import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketApiResponse, TicketResponse, TicketsApiResponse } from 'src/app/models/response/ticket.model';
import { GeneralService } from 'src/app/services/general.service';
import { TicketService } from 'src/app/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.scss'],
})
export class TopTenComponent implements OnInit, OnChanges, OnDestroy {
  @Input() entradaCadenaId: string;
  @Input() actualizarListados: boolean;

  @Output() salidaTicketSeleccionado: EventEmitter<TicketResponse> = new EventEmitter<TicketResponse>();
  listadoTicketsNuevos: TicketResponse[] = [];
  listadoTicketsResueltos: TicketResponse[] = [];
  listadoTicketsAtendiendo: TicketResponse[] = [];
  obteniendoDatos: boolean = false;
  estatusInicial: string;
  estatusResuelto: string;
  estatusAtendiendo: string;
  selectedOption = environment.estatusIniciado;

  subscriptionTopTenNuevos: Subscription;
  subscriptionTopTenResueltos: Subscription;
  subscriptionTopTenAtendiendo: Subscription;

  constructor(private ticketsApi: TicketService, generalApi: GeneralService) {
    this.selectedOption = environment.estatusIniciado;
  }
  ngOnDestroy(): void {
    this.subscriptionTopTenNuevos.unsubscribe();
    this.subscriptionTopTenResueltos.unsubscribe();
    this.subscriptionTopTenAtendiendo.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {

    //console.log("ngOnChanges componente TOPTEN");

    this.estatusInicial = environment.estatusIniciado;
    this.estatusResuelto = environment.estatusCerradoTienda;
    this.estatusAtendiendo = environment.estatusAtendido;
    this.ObtenerListados();
  }
  ngOnInit() {
    this.estatusInicial = environment.estatusIniciado;
    this.estatusResuelto = environment.estatusCerradoTienda;
    this.estatusAtendiendo = environment.estatusAtendido;

    this.ObtenerListados();
  }

  segmentChanged(event) {
    this.selectedOption = event.detail.value;
  }

  selectedTicketChanged(elticket: TicketResponse) {
    this.salidaTicketSeleccionado.emit(elticket);
  }


  ObtenerListados() {

    this.obteniendoDatos = true;
    const filtro = `{"estatus":"${environment.estatusIniciado}"}`;
    this.subscriptionTopTenNuevos = this.ticketsApi.obtenerTicketsFiltro(this.entradaCadenaId, filtro, 1, 10).subscribe(
      (exito: TicketsApiResponse) => {
        if (exito.result === 'OK') {
          this.listadoTicketsNuevos = exito.dtoResult;
          if (this.listadoTicketsNuevos.length > 0) {
            this.salidaTicketSeleccionado.emit(this.listadoTicketsNuevos[0]);
          }
          this.obteniendoDatos = false;
        }
      },
      (error) => { }
    );
    this.obteniendoDatos = true;
    this.subscriptionTopTenResueltos = this.ticketsApi.obtenerTicketsFiltro(this.entradaCadenaId, `{"estatus":"cerrados"}`, 1, 10)
    .subscribe(
      (exito: TicketsApiResponse) => {
        if (exito.result === 'OK') {
          this.listadoTicketsResueltos = exito.dtoResult;

          this.obteniendoDatos = false;
        }
      },
      (error) => { }
    );
    this.obteniendoDatos = true;
    this.subscriptionTopTenAtendiendo = this.ticketsApi
      .obtenerTicketsFiltro(this.entradaCadenaId, `{"estatus":"${environment.estatusAtendido}"}`, 1, 10)
      .subscribe(
        (exito: TicketsApiResponse) => {
          if (exito.result === 'OK') {
            this.listadoTicketsAtendiendo = exito.dtoResult;

            this.obteniendoDatos = false;
          }
        },
        (error) => { }
      );
  }
}
