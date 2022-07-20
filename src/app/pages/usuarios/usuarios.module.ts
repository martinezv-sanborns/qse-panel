import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { SwiperModule } from 'swiper/angular';
import { ComunesModule } from '../../components/common/comunes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    ComunesModule
    
  ],
  declarations: [UsuariosPage]
})
export class UsuariosPageModule {}
