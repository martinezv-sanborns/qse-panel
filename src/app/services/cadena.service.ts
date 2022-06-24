import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { CadenasAPIResponse } from '../models/response/cadena.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CadenaService {

  
  constructor(private generalAPI: GeneralService) { }

  obtenerCanales(usuarioId:string) {

    console.log("ddssadsddasds");

    
    return this.generalAPI.getQuery(`/api/cadena/listado/async/${usuarioId}`).pipe(map((laRespuesta: CadenasAPIResponse) => laRespuesta));
  }

}
