import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { ItemMenu } from "src/app/models/item-menu.model";
import { EstatusResponse } from "src/app/models/response/estatus.model";
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-menu-ticket',
  templateUrl: './menu-ticket.component.html',
  styleUrls: ['./menu-ticket.component.scss'],
})
export class MenuTicketComponent implements OnInit {

  @Input() elEstatus: EstatusResponse;

  itemsMenu: ItemMenu[] = [
    {
      id: 'detalle-ticket',
      valor: 'Detalle Ticket',
      icono: 'eye-outline'
    },

  ];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() 
  {
    if ((this.elEstatus.estatusId === environment.estatusAtendido)) {
    this.itemsMenu.push(
      {
      id: 'intervenido-ticket',
      valor: 'Intervenido',
      icono: 'add-outline'
    },
    {
      id: 'cerradocorporativo-ticket',
      valor: 'Cerrado Corporativo',
      icono: 'add-outline'
    },
    {
      id: 'cerradotienda-ticket',
      valor: 'Cerrado en Tienda',
      icono: 'add-outline'
    },
    );
  }

  if (this.elEstatus.estatusId === environment.estatusInicioado) {
    this.itemsMenu.push({
      id: 'atendido-ticket',
      valor: 'Atender',
      icono: 'time-outline'
    });
  }

  if (this.elEstatus.estatusId === environment.estatusReabierto ) {
    this.itemsMenu.push(    {
      id: 'cerradocorporativo-ticket',
      valor: 'Cerrado Corporativo',
      icono: 'add-outline'
    },
    {
      id: 'cerradotienda-ticket',
      valor: 'Cerrado en Tienda',
      icono: 'add-outline'
    },);
  }

  if ((this.elEstatus.estatusId !== environment.estatusCerradoTienda)) {
    this.itemsMenu.push({
      id: 'reabierto-ticket',
      valor: 'Reabierto',
      icono: 'close-outline'
    });
  }

  this.itemsMenu.push({
    id: 'close-menu',
    valor: 'Cerrar menú',
    icono: 'exit-outline'
  });
   }

  opcionSeleccionada(valor: ItemMenu) {
    this.popCtrl.dismiss(
      valor.id
    );
  }


}
