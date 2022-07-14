import { ApiResponse } from './ApiResponse.model';

export class EstatusResponse {
  estatusId: string;
  nombre: string;
  nombreCorto: string;
  iconName?: string;
}

export class EstatusApiResponse extends ApiResponse{
  dtoResult: EstatusResponse[];
}
