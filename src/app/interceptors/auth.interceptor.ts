/* eslint-disable @typescript-eslint/naming-convention */
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  // services
  import { AuthService } from '../services/auth.service';
  import { HelperService } from '../services/helper.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
  
    constructor(private authService: AuthService, private helperService: HelperService) {
     }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
      if (this.authService.token !== null) {
        request = request.clone({
          setHeaders: {
            authorization: `Bearer ${this.authService.token}`,
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
  
      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
      ) as Observable<HttpEvent<any>>;
    }
  
    handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
      this.helperService.logout();
    }
  }
  