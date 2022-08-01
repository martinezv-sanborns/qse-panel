import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

// models
import { ItemMenu } from 'src/app/models/item-menu.model';
import { EstatusResponse } from 'src/app/models/response/estatus.model';

// globals
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-menu-ticket',
  templateUrl: './menu-ticket.component.html',
  styleUrls: ['./menu-ticket.component.scss'],
})
export class MenuTicketComponent implements OnInit {

  @Input() elEstatus: EstatusResponse;
  @Input() elRolUsuario: string;
  @Input() fechaAlta: Date;

  itemsMenu: ItemMenu[] = [
    {
      id: 'detalle-ticket',
      valor: 'Detalle del Caso',
      icono: 'eye-outline'
    },

  ];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {

    console.log('fecha de alta', this.fechaAlta);

    if (this.elEstatus.estatusId.toUpperCase() === environment.estatusIniciado
      || this.elEstatus.estatusId.toUpperCase() === environment.estatusReabierto) {
      this.itemsMenu.push({
        id: 'atender-ticket',
        valor: 'Atender',
        icono: 'hand-right-outline'
      });
    }

    if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido) {
      this.itemsMenu.push({
        id: 'intervenir-ticket',
        valor: 'Intervenir',
        icono: 'hand-right-outline'
      });
    }

    this.onShowCerrarCaso();

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

  onShowCerrarCaso() {

    // hora actual
    const today = new Date();

    const fechaAlta: Date = new Date(this.fechaAlta);
    let delta = (today.getTime() - fechaAlta.getTime()) / 1000;

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = delta % 60;


    // tienda hasta 48hrs
    // distrital de 48hrs un minuto 72hrs
    // corpo mas de 72hrs

    const totalHours = days * 24;

    console.log('total horas', totalHours);

    // tienda hasta 48hrs
    if (totalHours <= 48 && this.elRolUsuario.toUpperCase() === environment.tda) {
      if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido) {
        this.itemsMenu.push({
          id: 'cerrar-caso',
          valor: 'Cerrar caso',
          icono: 'close-outline'
        });
      }
    }
    else if (totalHours > 48 && totalHours <= 72 && this.elRolUsuario.toUpperCase() === environment.dis) {
      if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido) {
        this.itemsMenu.push({
          id: 'cerrar-caso',
          valor: 'Cerrar caso',
          icono: 'close-outline'
        });
      }
    }
    else if (totalHours > 72 && this.elRolUsuario.toUpperCase() === environment.corp) {
      if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido) {
        this.itemsMenu.push({
          id: 'cerrar-caso',
          valor: 'Cerrar caso',
          icono: 'close-outline'
        });
      }
    } else {
      if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido && this.elRolUsuario.toUpperCase() === environment.admin) {
        this.itemsMenu.push({
          id: 'cerrar-caso',
          valor: 'Cerrar caso',
          icono: 'close-outline'
        });
      }
    }
  }
}
