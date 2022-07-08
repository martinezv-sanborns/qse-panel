import {  EntidadCatalogoResponse } from './entidadmestra.model';
import { ApiResponse } from './apiresponse.model';

export class UsuarioResponse extends EntidadCatalogoResponse{
  usuarioId: string;
  email: string;
  nombreUsuario: string;
  intentos: number;
  bloqueado: boolean;
  rol: RolResponse;
}

export class RolResponse extends EntidadCatalogoResponse{
    rolId:string;
}


export class UsuariosApiResponse extends ApiResponse {
  dtoResult: UsuarioResponse[];
}

export class UsuarioApiResponse extends ApiResponse {
  dtoResult: UsuarioResponse;
}

export class UsuarioLinkResponse{
  message: string;
  link: string;
}


export class UsuarioLinkApiResponse extends ApiResponse{
  dtoResult: UsuarioLinkResponse;
}
