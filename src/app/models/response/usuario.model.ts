import { EntidadCatalogo } from './entidadmestra.model';
import { ApiResponse } from './apiresponse.model';

export class UsuarioResponse extends EntidadCatalogo{
  usuarioId: string;
  email: string;
  nombreUsuario: string;
  intentos: number;
  bloqueado: boolean;
}

export class UsuariosApiResponse extends ApiResponse {
  dtoResult: UsuarioResponse[];
}

export class UsuarioApiResponse extends ApiResponse {
  dtoResult: UsuarioResponse;
}
