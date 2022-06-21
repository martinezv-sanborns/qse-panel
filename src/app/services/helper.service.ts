import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getMessageAlert(message: string, type: string): string {
    return `<div class="ion-text-center"><img src="./assets/${type}.png" width="35px" height="35px"><br/>
      <span class='messaje-err'>${message}</span></div>`;
  }
}
