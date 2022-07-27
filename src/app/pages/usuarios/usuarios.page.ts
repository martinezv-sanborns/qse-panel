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

  numberPage = 1;
  pageSize = 10;

  constructor(private usuarioService: UsuarioService,
    private popVerCtrl: PopoverController,
    private mdlCtrl: ModalController) {


  }

  ngOnInit() {

    this.usuarioService.ObtenerListado(this.numberPage, this.pageSize).subscribe(exito => {
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
            if (exito.result == "OK") {
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
            if (exito.result == "OK") {
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

        this.usuarioService.eliminar(usuario).subscribe(exito => {

          console.log("usuario id", usuario);

          console.log("result", exito);

          let usuarioEliminado = exito.dtoResult;



          if (exito.result = "OK") {

            Swal.fire({
              icon: 'success',
              title: 'Eliminado ',
              text: `Usuario eliminado!`,
              showCancelButton: false,
              heightAuto: false,
              timer: 3000
            });



            let idx = this.Usuarios.findIndex(x => x.usuarioId == usuarioEliminado.usuarioId);

            if (idx != -1) {

              this.Usuarios.splice(idx);

            }
          }



        });
      }
    });


  }

  CambiarPassword(usuario: UsuarioResponse) {

  }

  async mostrarMenu(evento: any, usuario: UsuarioResponse) {
    const popover = await this.popVerCtrl.create({
      component: MenuUsuarioComponent,
      componentProps: {
        usuario: usuario
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
        case 'add-canal':
          this.ResetIntentos(usuario.usuarioId);
        
          break;
          case 'add-tiendas':
            this.ResetIntentos(usuario.usuarioId);
            
            break;
        case 'change-password':
          this.CambiarPassword(usuario);
          break;
        case 'delete-user':
          this.Delete(usuario.usuarioId);
          break;
        default:
          break;
      }
    }

  }


async AsignarCanal(usuarioId: string){

}

async AsignarTiendas(usuarioId: string){}

  async CreaUsuario() {

    const modal = await this.mdlCtrl.create(
      {
        component: CrearUsuarioComponent,
        cssClass: 'my-custom-class',
        mode: 'ios',
        backdropDismiss: true,

      });

    modal.present();


    const { data } = await modal.onDidDismiss();


    if (data != undefined) {
      console.log("el data", data.nuevo)
      if (data.registrado)
        this.Usuarios.push(data.nuevo);
    }

  }


  async buscar() {



    this.usuarioService.ObtenerListado(1, 10000).subscribe(exito => {
      this.Usuarios = exito.dtoResult;
    });

  }


  onSearchChange(event) {


    let criteria = event.detail.value;

    this.usuarioService.ObtenerListadoFiltrado(criteria, this.numberPage, this.pageSize).subscribe(exito => {

      if (exito.result == "OK") {
        this.Usuarios = [];
        this.Usuarios = exito.dtoResult;
      }

    }
    )


  }












}
