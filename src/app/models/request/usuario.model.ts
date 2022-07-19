import { EntidadCatalogoRequest } from "./entidad-catalogo.model";



export class UsuarioLockRequest {
    usuarioId: string;
    esBloqueado: boolean;
  }


export class NuevaPassWordUser{
    entidadId: string;
    nuevaPassword: string;
  }

  export class UsuarioLinkRequest {
    usuarioId: string;
    nombreUsuario: string;
    email: string;
  }
  export class OlvidePasswordRequest{
    correo: string;
  }
  

  export class UsuarioEditRequest {
    usuarioId: string;
    nombreUsuario: string;
    nombre: string;
    email: string;
    activo: boolean;
    rolId: string;
  }
  export class UsuarioEstatusRequest {
    usuarioId: string;
    esActivo: boolean;
  }




export interface UsuarioRequest extends EntidadCatalogoRequest {
    email: string;
    nombreUsuario: string;
    password: string;
    intentos: number;
    bloqueado: boolean;
    rolId: string;
}