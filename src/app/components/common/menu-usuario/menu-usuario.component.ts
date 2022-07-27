import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ItemMenu } from 'src/app/models/item-menu.model';
import { UsuarioResponse } from '../../../models/response/usuario.model';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {


  @Input() usuario: UsuarioResponse;

  itemsMenuUsuario: ItemMenu[];

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {

    this.itemsMenuUsuario = [
      {
        id: 'activar',
      valor: this.usuario?.activo ?'Desactivar' : 'Activar',
        icono: 'log-out-outline'
      },
      {
        id: 'bloquear',
        valor: this.usuario?.bloqueado? 'Desbloquear ':' Bloquear',
        icono: 'close-circle-outline'
      },
      {
        id: 'delete-user',
        valor: 'Eliminar Usuario',
        icono: 'trash-outline'
      },
      {
        id: 'change-password',
        valor: 'Cambiar contraseña',
        icono: 'key-outline'
      },
      {
        id: 'add-canal',
        valor: 'Asginar Cadena',
        icono: 'key-outline'
      },
      {
        id: 'add-tienda',
        valor: 'Asginar Tiendas',
        icono: 'key-outline'
      },
      {
        id: 'delete-user',
        valor: 'Eliminar Usuario',
        icono: 'trash-outline'
      }
    ];

  }




  opcionSeleccionada(valor: ItemMenu) {
    this.popCtrl.dismiss({
      item: valor
    });
  }


}
