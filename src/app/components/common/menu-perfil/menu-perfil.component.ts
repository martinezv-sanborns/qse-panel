import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ItemMenu } from 'src/app/models/item-menu.model';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.scss'],
})
export class MenuPerfilComponent implements OnInit {
  opcionesMenu: ItemMenu[] =
    [
      { id: 'close', valor: 'Cerrar sesión', icono: 'close-outline' },
      { id: 'changepassword', valor: 'Cambiar contraseña', icono: 'key-outline' },
      { id: 'cadena', valor: 'Cambiar cadena', icono: 'refresh-outline' },
      { id: 'perfil', valor: 'Mi perfil', icono: 'person-outline' },
    ];
  constructor(private popCtrl: PopoverController) { }

  menuSeleccionado(laopcion: ItemMenu) {
    this.popCtrl.dismiss({
      item: laopcion
    });
  }
  ngOnInit() { }

}
