import { ApiResponse } from "./response/ApiResponse.model";
import { EntidadMaestra } from "./response/entidadmestra.model";



export class UserRole{
    rol: string;
    nombre: string;
    id: string;
    acciones: string;
  }

export class Autenticado extends ApiResponse {
    dtoResult: Token;
  }
  
  export class Token extends EntidadMaestra {
    token: string;
    vigencia: Date;
    refreshToken: string;
  }
  