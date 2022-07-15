import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerTypes, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { LinkAPIResponse } from '../models/response/link.response.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private generalAPI: GeneralService,  private router: Router, private loadingCTRL: LoadingController) { }

  getMessageAlert(message: string, type: string): string {
    return `<div class="ion-text-center"><img src="./assets/${type}.png" width="35px" height="35px"><br/>
      <span class='messaje-err'>${message}</span></div>`;
  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


  validarLink(idlink: string) {


    console.log("entre a validar link");

    return this.generalAPI.getQueryOmitInterceptor(`/api/link/validar/${idlink}`)
      .pipe(
        map((laRespuesta: LinkAPIResponse) => laRespuesta)
      );


  }

  async showLoading(mensaje: string, type: SpinnerTypes) {
    const loading = await this.loadingCTRL.create({
      message: mensaje,
      animated: true,
      spinner: type,
    });

    loading.present();
  }

  async hideLoading() {
    setTimeout(() => this.checkAndCloseLoader(), 500);
  }

  async checkAndCloseLoader() {

    const loader = await this.loadingCTRL.getTop();
     if(loader !== undefined) {
       await this.loadingCTRL.dismiss();
     }
   }

}
