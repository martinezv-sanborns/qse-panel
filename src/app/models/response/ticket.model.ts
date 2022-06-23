import { ApiResponse } from './ApiResponse.model';
import { EntidadMaestra } from './entidadmestra.model';
import { EstatusResponse } from './estatus.model';
import { MedioContactoResponse } from './mediocontacto.model';
import { TiendaResponse } from './tiendaresponse.model';
import { TipoResponse } from './tipo.model';


export class TicketResponse extends EntidadMaestra {
    ticketId: string;
    numero: string;
    nombre: string;
    email: string;
    telefono: string;
    comentarios: string;
    folio: string;
    fechaVisita: Date;
    importe: number;
    empleado: string;
    tienda: TiendaResponse;
    estatus: EstatusResponse;
    medioContacto: MedioContactoResponse;
    ticketLogs: TicketLogResponse[];
    ticketTipos: TicketTipoResponse;

}
export interface TicketBaseResponse {
    ticketId: string;
    numero: string;
    nombre: string;
    email: string;
    telefono: string;
    comentarios: string;
    folio: string;
    fechaVisita: Date;
    importe: number;
    empleado?: string;
}
export class TicketApiResponse extends ApiResponse {
  dtoResult: TicketResponse;
}

export class TicketsApiResponse extends ApiResponse {
  dtoResult: TicketResponse[];
}


export class TicketLogResponse extends EntidadMaestra {
  ticketLogId: string;
  observaciones: string;
  estatus: EstatusResponse;
  //usuario: UsuarioResponse;

}
export interface TicketLogBaseResponse {
  ticketLogId: string;
  observaciones: string;
  estatus: EstatusResponse;
  //usuario: UsuarioResponse;
}
export class TicketLogApiResponse extends ApiResponse {
dtoResult: TicketLogResponse;
}

export class TicketLogsApiResponse extends ApiResponse {
dtoResult: TicketLogResponse[];
}

export class TicketTipoResponse extends EntidadMaestra {
  ticketId: string;
  tipoId: TipoResponse[];
}

export class TicketTipoApiResponse extends ApiResponse {
dtoResult: TicketLogResponse;
}

export class TicketTiposApiResponse extends ApiResponse {
dtoResult: TicketLogResponse[];
}