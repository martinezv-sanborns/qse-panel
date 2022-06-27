


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
  