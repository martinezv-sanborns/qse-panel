import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NuevaPassWordUser, UsuarioLinkRequest, UsuarioLockRequest } from '../models/request/usuario.model';
import { UsuarioApiResponse, UsuarioLinkApiResponse } from '../models/response/usuario.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private generalService: GeneralService) { }




  cambiarPassword(elNewPassword: NuevaPassWordUser) {
    return this.generalService
      .Put(`/api/usuario/cambiar/password/async`, elNewPassword)
      .pipe(
        map(
          (laRespuesta: UsuarioApiResponse) => laRespuesta)
      );
  }

  reenviarLink(usuarioLink: UsuarioLinkRequest) {
    return this.generalService
      .Post(`/api/usuario/reenviar/link/async`, usuarioLink)
      .pipe(
        map(
          (laRespuesta: UsuarioLinkApiResponse) => laRespuesta)
      );
  }

  
  desbloquear(elUsuario: UsuarioLockRequest) {
    return this.generalService
      .Post(`/api/usuario/lock/async`, elUsuario)
      .pipe(
        map(
          (laRespuesta: UsuarioApiResponse) => laRespuesta)
      );
  }

  eliminar(usuarioId: string) {
    return this.generalService
      .Delete(`/api/usuario/${usuarioId}/async`)
      .pipe(
        map(
          (laRespuesta: UsuarioApiResponse) => laRespuesta)
      );
  }


  establecerPassword(elNewPassword: NuevaPassWordUser) {
    return this.generalService
      .Put(`/api/usuario/establecer/password/async`, elNewPassword)
      .pipe(
        map(
          (laRespuesta: UsuarioApiResponse) => laRespuesta)
      );
  }







}
