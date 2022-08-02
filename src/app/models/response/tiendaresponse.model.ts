import { ApiResponse } from './ApiResponse.model';
import { Cadena } from './cadena.model';
import { EntidadCatalogoResponse } from './entidadmestra.model';
import { UsuarioResponse } from './usuario.model';
export class TiendaResponse extends EntidadCatalogoResponse {
    tiendaId: string;
    identificadorExterno: string;
    coordenadas: string;
    apertura: string;
    cierre: string;
    utm: string;
    diasOperacion: string;
    email: string;
    cadena: Cadena[];
    //zonaHoraria: ZonaHorariaResponse[];
}
export class TiendaApiResponse extends ApiResponse {
  dtoResult: TiendaResponse;
}

export class TiendasApiResponse extends ApiResponse {
  dtoResult: TiendaResponse[];
}


export class UsuarioTiendaResponse extends EntidadCatalogoResponse {
  tiendaId: string;
  usuarioId: string;
  usuario: UsuarioResponse;
}
export class UsuarioTiendaApiResponse extends ApiResponse {
dtoResult: UsuarioTiendaResponse;
}

export class UsuariosTiendaApiResponse extends ApiResponse {
dtoResult: UsuarioTiendaResponse[];
}