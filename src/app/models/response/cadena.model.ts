import { ApiResponse } from './ApiResponse.model';
import { EntidadCatalogoResponse } from './entidadmestra.model';
import { UsuarioResponse } from './usuario.model';

export class Cadena extends EntidadCatalogoResponse{
    cadenaId: number;

}
export class CadenaBaseResponse {
  cadenaId: string;
  nombre: string;
  nombreCorto: string;
  iconName?: any;
}
export class CadenaAPIResponse extends ApiResponse{
    dtoResult: Cadena;
}

export class CadenasAPIResponse extends ApiResponse{
    dtoResult: CadenaUsuarioResponse[];
}


export class CadenasUsuarioAPIResponse extends ApiResponse{
    dtoResult: CadenaUsuarioResponse[];
}


export class CadenaUsuarioResponse extends EntidadCatalogoResponse{
    cadenaId: string;
    usuarioId:string;
    cadena: CadenaBaseResponse;
    usuario:UsuarioResponse;

}


