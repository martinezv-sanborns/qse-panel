export class TiendaRequest {
  //tiendaId: string;
  nombre: string;
  nombreCorto: string;
  email: string;
  identificadorExterno: string;
  coordenadas: string;
  apertura: string;
  cierre: string;
  umt: string;
  diasOperacion: string;
  cadenaId: string;
  zonaHorariaId: number;
}

export class TiendaActivaRequest {
    tiendaId: string;
    esActivo: boolean;
  }