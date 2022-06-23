import { ApiResponse } from './ApiResponse.model';
import { EntidadCatalogo } from './entidadmestra.model';
import { EstatusResponse } from './estatus.model';


export class TiendaResponse extends EntidadCatalogo {
    tiendaId: string;
    identificarExterno: string;
    coordenadas: string;
    apertura: string;
    cierre: string;
    utm: string;
    diasOperacion: string;
    email: string;
    //cadena: CadenaResponse[];
    //zonaHoraria: ZonaHorariaResponse[];
}
export interface TiendaBaseResponse {
    tiendaId: string;
    identificarExterno: string;
    coordenadas: string;
    apertura: string;
    cierre: string;
    utm: string;
    diasOperacion: string;
    email: string;
}
export class TiendaApiResponse extends ApiResponse {
  dtoResult: TiendaResponse;
}

export class TiendasApiResponse extends ApiResponse {
  dtoResult: TiendaResponse[];
}