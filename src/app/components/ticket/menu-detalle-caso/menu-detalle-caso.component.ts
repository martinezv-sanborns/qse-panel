import { Component, Input, OnInit } from '@angular/core';

// controllers
import { PopoverController } from '@ionic/angular';

// models
import { ItemMenu } from 'src/app/models/item-menu.model';
import { EstatusResponse } from 'src/app/models/response/estatus.model';

// globals
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-detalle-caso',
  templateUrl: './menu-detalle-caso.component.html',
  styleUrls: ['./menu-detalle-caso.component.scss'],
})
export class MenuDetalleCasoComponent implements OnInit {

  @Input() elEstatus: EstatusResponse;
  @Input() elRolUsuario: string;

  itemsMenu: ItemMenu[] = [
  ];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {

    if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido
    || this.elEstatus.estatusId.toUpperCase() === environment.estatusIniciado) {

      this.itemsMenu.push({
        id: 'intervenir-ticket',
        valor: 'Intervenir',
        icono: 'hand-right-outline'
      });
    }

    if (this.elEstatus.estatusId.toUpperCase() === environment.estatusAtendido &&
      (this.elRolUsuario.toUpperCase() === environment.admin || this.elRolUsuario.toUpperCase() === environment.corp
        || this.elRolUsuario.toUpperCase() === environment.tda || this.elRolUsuario.toUpperCase() === environment.dis)) {
      this.itemsMenu.push({
        id: 'cerrar-caso',
        valor: 'Cerrar caso',
        icono: 'close-outline'
      });
    }

    // if ((this.elEstatus.estatusId.toUpperCase() === environment.estatusCerradoTienda
    //   || this.elEstatus.estatusId.toUpperCase() === environment.estatusCerradoCorpo) &&
    //   (this.elRolUsuario.toUpperCase() === environment.corp || this.elRolUsuario.toUpperCase() === environment.admin)) {
    //   this.itemsMenu.push({
    //     id: 'reabrir-ticket',
    //     valor: 'Reabrir',
    //     icono: 'folder-open-outline'
    //   });
    // }

/*     this.itemsMenu.push({
      id: 'close-menu',
      valor: 'Cerrar menú',
      icono: 'exit-outline'
    }); */
  }

  opcionSeleccionada(valor: ItemMenu) {
    this.popCtrl.dismiss(
      valor.id
    );
  }
}
