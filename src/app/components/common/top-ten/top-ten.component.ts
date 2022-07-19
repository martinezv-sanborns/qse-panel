import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TicketApiResponse, TicketResponse, TicketsApiResponse } from 'src/app/models/response/ticket.model';
import { GeneralService } from 'src/app/services/general.service';
import { TicketService } from 'src/app/services/ticket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.scss'],
})
export class TopTenComponent implements OnInit, OnChanges {
  @Input() entradaCadenaId : string;
  listadoTicketsNuevos: TicketResponse[]=[];
  listadoTicketsResueltos: TicketResponse[]=[];
  listadoTicketsAtendiendo: TicketResponse[]=[];
  obteniendoDatos:Boolean=false;
  estatusInicial :string;
  estatusResuelto :string;
  estatusAtendiendo :string;
  selectedOption = environment.estatusIniciado;


  constructor( private ticketsApi:TicketService, generalApi: GeneralService  ) { 
    console.log("SELECTED", this.selectedOption);
    this.selectedOption = environment.estatusIniciado;
  }
  
  ngOnChanges(changes: SimpleChanges): void { 
    this.estatusInicial = environment.estatusIniciado;
    this.estatusResuelto = environment.estatusCerradoTienda;
    this.estatusAtendiendo = environment.estatusAtendido;
    //console.log("LA CADENA TOPTEN changes", this.entradaCadenaId);
    this.ObtenerListados();
   }
  ngOnInit() {
    this.estatusInicial = environment.estatusIniciado;
    this.estatusResuelto = environment.estatusCerradoTienda;
    this.estatusAtendiendo = environment.estatusAtendido;
    
    this.ObtenerListados();
  }

  segmentChanged(event){
    //console.log("segment changed", event.detail.value);
    this.selectedOption = event.detail.value;
  }


  ObtenerListados(){

    this.obteniendoDatos=true;
    const filtro = `{"estatus":"${environment.estatusIniciado}"}`;
    this.ticketsApi.obtenerTicketsFiltro(this.entradaCadenaId, filtro,1,10).subscribe(
      (exito:TicketsApiResponse)=>{
          if(exito.result==="OK"){
              this.listadoTicketsNuevos = exito.dtoResult;
              console.log("Resultados API NUEVOS", this.listadoTicketsNuevos );
              this.obteniendoDatos=false;
          }
      },
      (error)=>{}
    );
    this.obteniendoDatos=true;
    this.ticketsApi.obtenerTicketsFiltro(this.entradaCadenaId, `{"estatus":"${environment.estatusCerradoCorpo}"}`,1,10).subscribe(
      (exito:TicketsApiResponse)=>{
          if(exito.result==="OK"){
              this.listadoTicketsResueltos = exito.dtoResult;
              console.log("Resultados API CERRADOS", this.listadoTicketsResueltos );
              this.obteniendoDatos=false;
          }
      },
      (error)=>{}
    );
    this.obteniendoDatos=true;
    this.ticketsApi.obtenerTicketsFiltro(this.entradaCadenaId, `{"estatus":"${environment.estatusAtendido}"}`,1,10).subscribe(
      (exito:TicketsApiResponse)=>{
          if(exito.result==="OK"){
              this.listadoTicketsAtendiendo = exito.dtoResult;
              console.log("Resultados API ATENDIENDO", this.listadoTicketsAtendiendo );
              this.obteniendoDatos=false;
          }
      },
      (error)=>{}
    );
  
  }



}
