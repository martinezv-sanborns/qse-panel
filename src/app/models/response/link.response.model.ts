import { ApiResponse } from './apiresponse.model';
export class LinkResponse{
  vigente: boolean;
  horasTranscurridas: number;
  message: string;
}

export class LinkAPIResponse extends ApiResponse{
  dtoResult: LinkResponse;
}
