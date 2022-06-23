import { ApiResponse } from './ApiResponse.model';
import { EntidadCatalogo } from './entidadmestra.model';

export class Cadena extends EntidadCatalogo{
    portalId: number;
}
export interface CadenaBaseResponse {
  portalId: number;
  nombre: string;
  nombreCorto: string;
  iconName?: any;
}
export class CadenaAPIResponse extends ApiResponse{
    dtoResult: Cadena;
}

export class CadenasAPIResponse extends ApiResponse{
    dtoResult: Cadena[];
}
