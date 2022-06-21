import { ApiResponse } from './ApiResponse.model';
import { EntidadMaestra } from './entidadmestra.model';
import { EstatusResponse } from './estatus.model';
import { TiendaResponse } from './tiendaresponse.model';


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
    //medioContacto: MedioContactoResponse[];

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