import { ApiResponse } from "./response/ApiResponse.model";

export class DiaSemana {
    id: number;
    name: string;
    subName: string;
    shortName: string;
  }

  export class NumeroTicketsResponse {
    estatusid: string;
    name: string;
    conteo: number;
    color: string;
    iconname: string;
  }

  export class NumeroTicketsResponseApiResponse extends ApiResponse {
    dtoResult: NumeroTicketsResponse;
  }
  
  export class NumerosTicketsResponseApiResponse extends ApiResponse {
    dtoResult: NumeroTicketsResponse[];
  }