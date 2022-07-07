import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComunesModule } from '../../components/common/comunes.module';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    LoginPageRoutingModule,ComunesModule
  ],
  declarations: [LoginPage],
  providers: [{provide: RECAPTCHA_SETTINGS, useValue: { siteKey :  environment.recaptcha } as RecaptchaSettings  }],
})
export class LoginPageModule {}
