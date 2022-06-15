export class EntidadMaestra {
    fechaAlta: Date;
    fechaModificacion: Date;
    activo: boolean;
  }
  export class EntidadCatalogo extends EntidadMaestra {
    nombre: string;
    nombreCorto: string;
    iconName: string;
  }