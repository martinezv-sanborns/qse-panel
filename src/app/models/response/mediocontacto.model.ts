import { ApiResponse } from './ApiResponse.model';

export class MedioContactoResponse {
  medioContactoId: number;
  nombre: string;
  nombreCorto: string;
  iconName?: string;
}

export class MedioContactoApiResponse extends ApiResponse{
  dtoResult: MedioContactoResponse[];
}