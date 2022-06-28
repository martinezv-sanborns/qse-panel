import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstablecerPasswordPageRoutingModule } from './establecer-password-routing.module';

import { EstablecerPasswordPage } from './establecer-password.page';
import { ComunesModule } from 'src/app/components/common/comunes.module';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EstablecerPasswordPageRoutingModule,
    ComunesModule
  ],
  declarations: [EstablecerPasswordPage]
})
export class EstablecerPasswordPageModule {}
