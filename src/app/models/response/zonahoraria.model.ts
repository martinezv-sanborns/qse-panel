import { ApiResponse } from './ApiResponse.model';

export class ZonaHorariaResponse {
  zonaHorariaId: number;
  nombre: string;
  nombreCorto: string;
  iconName?: string;
  utc: number;
}

export class ZonaHorariaApiResponse extends ApiResponse{
  dtoResult: ZonaHorariaResponse[];
}