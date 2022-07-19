import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ItemMenu } from 'src/app/models/item-menu.model';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {


  itemsMenuUsuario: ItemMenu[] = [
    {
      id: 'activar',
      valor: 'Activar / Desactivar',
      icono: 'log-out-outline'
    },
    {
      id: 'reset-intentos',
      valor: 'Resetear intentos',
      icono: 'alert-outline'
    },
    {
      id: 'change-password',
      valor: 'Cambiar contraseña',
      icono: 'key-outline'
    },
    {
      id: 'delete-user',
      valor: 'Eliminar Usuario',
      icono: 'trash-outline'
    }
  ];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {}




  opcionSeleccionada(valor: ItemMenu) {
    this.popCtrl.dismiss({
      item: valor
    });
  }


}
