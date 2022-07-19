import { ApiResponse } from './ApiResponse.model';
import { Cadena } from './cadena.model';
import { EntidadCatalogoResponse } from './entidadmestra.model';
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
