/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { Autenticado, UserRole } from '../models/auth.model';

// service
import { GeneralService } from './general.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private esLogueado = new BehaviorSubject<boolean>(false);

  loggedIn = this.esLogueado.asObservable();

  user!: UserRole;

  get token(): any {
    return localStorage.getItem('sonidera');
  }

  constructor(private generalService: GeneralService, private router: Router) {
    if (this.token !== null) {
      this.esLogueado.next(!!this.token);
      this.user = this.getUser(this.token);
    } else {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }

  login(elUserName: string, elPassword: string) {

    const elbody = {
      usuario: elUserName,
      password: elPassword
    };

    return this.generalService.login(elbody).pipe(
      map(
        (laRespuesta: Autenticado) => {
          if (laRespuesta.result === 'OK') {

            // limpiar primero storage
            localStorage.clear();

            this.esLogueado.next(true);

            this.user = this.getUser(laRespuesta.dtoResult.token);
            localStorage.setItem('token', laRespuesta.dtoResult.token);
            localStorage.setItem('rol', this.user.rol);
            localStorage.setItem('userName', this.user.nombre);
            localStorage.setItem('UserId', this.user.id);
          }
          return laRespuesta;
        }
      )
    );
  }

  private getUser(token: string): UserRole {
    return JSON.parse(atob(token.split('.')[1])) as UserRole;
  }
}
