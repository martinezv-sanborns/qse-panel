import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ItemMenu } from 'src/app/models/item-menu.model';

@Component({
  selector: 'app-menu-tienda',
  templateUrl: './menu-tienda.component.html',
  styleUrls: ['./menu-tienda.component.scss'],
})
export class MenuTiendaComponent implements OnInit {

  @Input() esActivo: boolean;
  
  itemsMenu: ItemMenu[] = [
    {
      id: 'detalle-tienda',
      valor: 'Detalle Tienda',
      icono: 'eye-outline'
    },
    {
      id: 'edit-tienda',
      valor: 'Editar',
      icono: 'pencil-outline'
    }

  ];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {

    if (!this.esActivo) {
      this.itemsMenu.push({
        id: 'activar-tienda',
        valor: 'Activar',
        icono: 'checkmark-circle-outline'
      });
    }
    else {
      this.itemsMenu.push({
        id: 'desactivar-tienda',
        valor: 'Desactivar',
        icono: 'close-circle-outline'
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
