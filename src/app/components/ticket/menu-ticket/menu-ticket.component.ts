import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ItemMenu } from 'src/app/models/item-menu.model';
import { EstatusResponse } from 'src/app/models/response/estatus.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-menu-ticket',
  templateUrl: './menu-ticket.component.html',
  styleUrls: ['./menu-ticket.component.scss'],
})
export class MenuTicketComponent implements OnInit {

  @Input() elEstatus: EstatusResponse;
  @Input() elRolUsuario: string;

  itemsMenu: ItemMenu[] = [
    {
      id: 'detalle-ticket',
      valor: 'Detalle Ticket',
      icono: 'eye-outline'
    },

  ];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {

    if (this.elEstatus.estatusId.toUpperCase() === environment.estatusIniciado
      || this.elEstatus.estatusId.toUpperCase() === environment.estatusReabierto) {
      this.itemsMenu.push({
        id: 'atender-ticket',
        valor: 'Atender',
        icono: 'time-outline'
      });
    }

    if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido) {

      this.itemsMenu.push({
        id: 'intervenir-ticket',
        valor: 'Intervenir',
        icono: 'hand-right-outline'
      });
    }

    if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido &&
      (this.elRolUsuario.toUpperCase() === environment.admin || this.elRolUsuario.toUpperCase() === environment.corp
        || this.elRolUsuario.toUpperCase() === environment.tda)) {
      this.itemsMenu.push({
        id: 'cerrar-caso',
        valor: 'Cerrar caso',
        icono: 'close-outline'
      });
    }

    if ((this.elEstatus.estatusId.toUpperCase() === environment.estatusCerradoTienda
      || this.elEstatus.estatusId.toUpperCase() === environment.estatusCerradoCorpo) &&
      (this.elRolUsuario.toUpperCase() === environment.corp || this.elRolUsuario.toUpperCase() === environment.admin)) {
      this.itemsMenu.push({
        id: 'reabrir-ticket',
        valor: 'Reabrir',
        icono: 'folder-open-outline'
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
