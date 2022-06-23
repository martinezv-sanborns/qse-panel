import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CadenasAPIResponse } from '../models/response/cadena.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CadenaService {

  
  constructor(private generalAPI: GeneralService) { }

  obtenerPortales() {
    return this.generalAPI.getQuery('/api/portal/listado/async/1/1000').pipe(map((laRespuesta: CadenasAPIResponse) => laRespuesta));
  }

}
