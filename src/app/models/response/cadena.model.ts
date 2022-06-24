import { ApiResponse } from './ApiResponse.model';
import { EntidadCatalogo } from './entidadmestra.model';

export class Cadena extends EntidadCatalogo{
    cadenaId: number;
}
export interface CadenaBaseResponse {
    cadenaId: number;
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
