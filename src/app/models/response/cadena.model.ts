import { ApiResponse } from './ApiResponse.model';
import { EntidadCatalogoResponse } from './entidadmestra.model';

export class Cadena extends EntidadCatalogoResponse{
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
