import { HttpBackend, HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  token: string;
  private customHttpClient: HttpClient;

  constructor(public serviciogeneral: HttpClient, backend: HttpBackend) { 
    this.customHttpClient = new HttpClient(backend);
  }


  getQuery<T>(query: string) {
    //${environment.endPointApi}
    const url = `${query}`;
    return this.serviciogeneral.get<T>(url);
  }
  Post(query: string, body: any) {
    const url = `${query}`;
    return this.serviciogeneral.post(url, body);
  }

  Put(query: string, body: any) {
    const url = `${query}`;
    return this.serviciogeneral.put(url, body);
  }

  PutParams(query: string) {
    const url = `${query}`;
    return this.serviciogeneral.put(url, null);
  }

  Delete(query: string) {
    const url = `${query}`;
    return this.serviciogeneral.delete(url);
  }

  login(body: any) {
    const url = `/api/auth/async`;
    return this.serviciogeneral.post(url, body);
  }

  getQueryOmitInterceptor<T>(query: string) {
    //${environment.endPointApi}
    const url = `${query}`;
    return this.customHttpClient.get<T>(url);
  }

  postOmitInterceptor(query: string, body: any) {
    const url = `${query}`;
    return this.customHttpClient.post(url, body);
  }

  PostMediaUpload(query: string, Archivo: File){
    const url = `/api/${query}`;
    const formD = new FormData();
    formD.append('archivo', Archivo);

    const encabezados = new HttpHeaders({
      'Access-Control-Aññow-Oring':'*',
      Authorizacion: this.token
    });
    return this.serviciogeneral.post(url, formD);
  }

  getQueryImage(query: string){
    const url = `${query}`;
    return this.customHttpClient.post(url, { responseType: 'blob'});
  }
}
