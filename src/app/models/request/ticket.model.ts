export class TicketStatusRequest{
  ticketId: string;
  estatusId: string;
  observaciones: string;
  activo: boolean;
  esCerrarCaso?: boolean;
}
