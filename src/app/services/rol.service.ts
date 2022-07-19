import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RolApiResponse, RolesApiResponse } from '../models/response/Rol.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private generalService: GeneralService) { }

  obtenerRoles() {
    return this.generalService
      .getQuery(`/api/rol/list/async`)
      .pipe(
        map(
          (laRespuesta: RolesApiResponse) => laRespuesta)
      );
  }
}
