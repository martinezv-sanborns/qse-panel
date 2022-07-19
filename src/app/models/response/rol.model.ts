import { ApiResponse } from './apiresponse.model';
import { EntidadCatalogoResponse } from './entidadmestra.model';



export class RolResponse extends EntidadCatalogoResponse {
    rolId:string
  }

  export class RolApiResponse extends ApiResponse {
    dtoResult: RolResponse;
  }
  
  export class RolesApiResponse extends ApiResponse {
    dtoResult: RolResponse[];
  }


  


  