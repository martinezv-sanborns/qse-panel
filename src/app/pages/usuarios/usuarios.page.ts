import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioResponse } from '../../models/response/usuario.model';
import { MenuUsuarioComponent } from '../../components/common/menu-usuario/menu-usuario.component';
import { PopoverController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { UsuarioLockRequest } from 'src/app/models/request/usuario.model';
import { CrearUsuarioComponent } from '../../components/common/crear-usuario/crear-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  Usuarios: UsuarioResponse[] = [];

  cargando: false;

  constructor(private usuarioService: UsuarioService,
              private popVerCtrl: PopoverController,
              private mdlCtrl: ModalController) {


  }

  ngOnInit() {

    this.usuarioService.ObtenerListado(1, 10000).subscribe(exito => {
      this.Usuarios = exito.dtoResult;
    });

  }


  Activar(usuario: UsuarioResponse) {

    if (usuario.activo) {
      Swal.fire({
        icon: 'warning',
        title: 'Desactivar Usuario',
        text: `¿Estas seguro que deseas desactivar el usuario?`,
        showCancelButton: true,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.Desactivar(usuario.usuarioId).subscribe(exito => {

            console.log("exito", exito);
            if (exito.result == "OK") {

              usuario.activo = !usuario.activo;
            }

          });
        }
      });

    }
    else {

      Swal.fire({
        icon: 'warning',
        title: 'Activar Usuario',
        text: `¿Estas seguro que deseas activar el usuario?`,
        showCancelButton: true,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.Activar(usuario.usuarioId).subscribe(exito => {
            if (exito.result == "OK") {
              usuario.activo = !usuario.activo;
            }
          });
        }
      });

    }



  }


  Bloquear(usuario: UsuarioResponse) {

    if (usuario.bloqueado) {
      Swal.fire({
        icon: 'warning',
        title: 'Desbloquear Usuario',
        text: `¿Estas seguro que deseas desbloquear el usuario?`,
        showCancelButton: true,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {

          const user = new UsuarioLockRequest();
          user.usuarioId = usuario.usuarioId;
          user.esBloqueado = !usuario.bloqueado;

          this.usuarioService.desbloquear(user).subscribe(exito => {          
            if (exito.result == "OK"){
              usuario.bloqueado = usuario.bloqueado;
            
            }
          });
        }
      });
    }
    else {

      Swal.fire({
        icon: 'warning',
        title: 'Bloquear Usuario',
        text: `¿Estas seguro que deseas bloquear el usuario?`,
        showCancelButton: true,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {

          const user = new UsuarioLockRequest();
          user.usuarioId = usuario.usuarioId;
          user.esBloqueado = !usuario.bloqueado;

          this.usuarioService.desbloquear(user).subscribe(exito => {
            if (exito.result == "OK") 
            {
              usuario.bloqueado = !usuario.bloqueado;
            }


          });
        }
      });

    }



  }

  ResetIntentos(usuarioId: string) {

    Swal.fire({
      icon: 'warning',
      title: 'Reset intentos',
      text: `¿Estas seguro que deseas resetear los intentos del usuario?`,
      showCancelButton: true,
      heightAuto: false
    }).then((result) => {



      if (result.isConfirmed) {
        console.log("usuario a resetear", usuarioId)

        this.usuarioService.ResetIntentos(usuarioId).subscribe(result => {

          if (result.result == 'OK') {

            console.log("reseteado pa");
          }

        });

      }
    });

  }

  Delete(usuario: string) {

    Swal.fire({
      icon: 'warning',
      title: 'Eliminar usuario',
      text: `¿Estas seguro que deseas eliminar el usuario?`,
      showCancelButton: true,
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        // algo
      }
    });


  }

  CambiarPassword(usuario: string) {

  }

  async mostrarMenu(evento: any, usuario: UsuarioResponse) {
    const popover = await this.popVerCtrl.create({
      component: MenuUsuarioComponent,
      componentProps: {
      },
      cssClass: 'my-custom-class',
      event: evento,
      mode: 'ios',
      backdropDismiss: true,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data !== undefined) {
      switch (data.item.id) {
        case 'activar':
          console.log(usuario);
          this.Activar(usuario);
          break;
        case 'reset-intentos':

          this.ResetIntentos(usuario.usuarioId);
          usuario.intentos = 0;

          break;
        case 'change-password':
          this.CambiarPassword('');
          break;
        case 'delete-user':
          this.Delete('');
          break;
        default:
          break;
      }
    }

  }



  async CreaUsuario (){

    const modal = await this.mdlCtrl.create(
            {
              component:CrearUsuarioComponent,
              cssClass: 'my-custom-class',
              mode: 'ios',
              backdropDismiss: true,
            
            });

            modal.present();

  }








}
