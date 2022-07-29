import { Component, getPlatform, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TicketResponse } from 'src/app/models/response/ticket.model';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  cadenaId: string='';
  rolName='';
  ticketSeleccionado : TicketResponse;
  ticketCambiado:Boolean=false;
  isMobile : boolean=false;

  constructor(private helperAPI:HelperService) {
    //this.cadenaId = localStorage.getItem('cadenaSelectedId');
    this.helperAPI.isMobile().then(
      (data)=>{
      this.isMobile = data;
      }
    );
   }

  ngOnChanges(changes: SimpleChanges): void {
    //this.cadenaId = localStorage.getItem('cadenaSelectedId');
    //console.log('La cadena en el home on onchanges', this.cadenaId );
  }

  ngOnInit() {
      this.cadenaId = localStorage.getItem('cadenaSelectedId');
      this.rolName = localStorage.getItem('rolName');
      //console.log('La cadena en el home ininit', this.cadenaId );
  }

  ticketSeleccionadoChanged(elTicket: TicketResponse){
      this.ticketSeleccionado = elTicket;
  }
  HaCambiado(){
    //console.log("HOME PAGE RECIBIO NOTIFICACION");
    this.ticketCambiado= !this.ticketCambiado;

  }

}
