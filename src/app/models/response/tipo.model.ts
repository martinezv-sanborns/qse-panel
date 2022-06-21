import { ApiResponse } from './ApiResponse.model';

export class TipoResponse {
  tipoId: number;
  nombre: string;
  nombreCorto: string;
  iconName?: string;
}

export class TipoApiResponse extends ApiResponse{
  dtoResult: TipoResponse[];
}