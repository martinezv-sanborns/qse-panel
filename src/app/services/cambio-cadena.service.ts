import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CambioCadenaService {

  @Output() cambioPortalEmit: EventEmitter<boolean> = new EventEmitter();
  cambioPortal = false;

  constructor() { }

  onChangeadena() {
    this.cambioPortal = !this.cambioPortal;
    this.cambioPortalEmit.emit(this.cambioPortal);
  }
}
