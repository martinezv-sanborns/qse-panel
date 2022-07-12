import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComunesModule } from './components/common/comunes.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './guards/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    IonicModule.forRoot(),

    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    ComunesModule,
   CommonModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true } ],
  bootstrap: [AppComponent],
})
export class AppModule {}
