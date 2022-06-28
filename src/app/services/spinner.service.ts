import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading$ = new Subject<boolean>();
  private titulo: string;

  get getTitulo() { return this.titulo; }
  set setTitulo(elTitulo: string) { this.titulo = elTitulo; }

  show(): void {
    try {
      this.isLoading$.next(true);
    } catch (error) {
      console.log(error);
    }
  }

  hide(): void {

    try {
      this.isLoading$.next(false);
    } catch (error) {
      console.log(error);
    }
  }
}
