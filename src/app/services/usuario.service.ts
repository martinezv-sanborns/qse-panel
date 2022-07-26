import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NuevaPassWordUser, OlvidePasswordRequest, UsuarioLinkRequest, UsuarioLockRequest, UsuarioRequest } from '../models/request/usuario.model';
import { UsuarioApiResponse, UsuarioLinkApiResponse, UsuariosApiResponse } from '../models/response/usuario.model';
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

    console.log("el usuario lock",elUsuario)

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
      .pipe(map((laRespuesta: UsuarioApiResponse) => laRespuesta)
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


  sendCorreoOlvidePass(correoUser: OlvidePasswordRequest) {
    return this.generalService
      .postOmitInterceptor(`/api/usuario/olvide/password/async`, correoUser)
      .pipe(
        map(
          (laRespuesta: UsuarioLinkApiResponse) => laRespuesta)
      );
  }


  ObtenerListado(numberPage : number , pageSize: number ) {
    return this.generalService
    .getQuery(`/api/usuario/listado/async/${numberPage}/${pageSize}`)
      .pipe(
        map(
          (laRespuesta: UsuariosApiResponse) => laRespuesta)
      );
  }


  
  ObtenerListadoFiltrado(criteria:string ,numberPage : number , pageSize: number ) {
    return this.generalService
    .getQuery(`/api/usuario/listado/async/${criteria}/${numberPage}/${pageSize}`)
      .pipe(
        map(
          (laRespuesta: UsuariosApiResponse) => laRespuesta)
      );
  }


  Activar(usuarioId : string ) {
    return this.generalService
    .Put(`/api/usuario/activar/${usuarioId}`,'')
      .pipe(
        map(
          (laRespuesta: UsuariosApiResponse) => laRespuesta)
      );
  }


  Desactivar(usuarioId : string ) {
    return this.generalService
    .Put(`/api/usuario/desactivar/${usuarioId}`,'')
      .pipe(
        map(
          (laRespuesta: UsuariosApiResponse) => laRespuesta)
      );
  }


  registrar(usuario:UsuarioRequest){
    return this.generalService.Post(`/api/usuario/async`,usuario).pipe(
      map(
        (laRespuesta:UsuarioApiResponse)=>laRespuesta)
        );
  }

  




  ResetIntentos( usuarioId: string ) {
    return this.generalService
    .Put(`/api/usuario/resetearIntentos/${usuarioId}`,'')
      .pipe(
        map(
          (laRespuesta: UsuariosApiResponse) => laRespuesta)
      );

  }




}
