import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private generalAPI: GeneralService,  private router: Router) { }

  getMessageAlert(message: string, type: string): string {
    return `<div class="ion-text-center"><img src="./assets/${type}.png" width="35px" height="35px"><br/>
      <span class='messaje-err'>${message}</span></div>`;
  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
