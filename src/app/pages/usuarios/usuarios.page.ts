import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioResponse } from '../../models/response/usuario.model';
import { MenuUsuarioComponent } from '../../components/common/menu-usuario/menu-usuario.component';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  Usuarios: UsuarioResponse [] = [];

  cargando:false;

  constructor(private usuarioService: UsuarioService,
              private popVerCtrl: PopoverController,) {


   }

  ngOnInit() {
  
  this.usuarioService.ObtenerListado(1,10000).subscribe(exito=>{

   
    this.Usuarios= exito.dtoResult;

    console.log(exito);
  });
  
  }


  Activar(usuarioId:string){




  }


  Desbloquear(usuario:string){}

  ResetIntentos(usuarioId:string)
  {

   Swal.fire({
      icon: 'warning',
      title: 'Reset intentos',
      text: `¿Estas seguro que deseas resetear los intentos del usuario?`,
      showCancelButton: true,
      heightAuto: false
    }).then((result) => {

    

      if (result.isConfirmed) 
      {
        console.log("usuario a resetear", usuarioId)
    
       this.usuarioService.ResetIntentos(usuarioId).subscribe(result=>{

        if(result.result=='OK'){

          console.log("reseteado pa");
        }

       });

      }
    });

  }

  Delete(usuario: string){

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

  CambiarPassword(usuario:string){

  }

  async mostrarMenu(evento: any, usuario:UsuarioResponse) {
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

          this.Activar('');
          break;
        case 'reset-intentos':

          this.ResetIntentos(usuario.usuarioId);
          usuario.intentos=0;

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

}
