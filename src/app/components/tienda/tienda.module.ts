import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComunesModule } from '../common/comunes.module';
import { MenuTiendaComponent } from './menu-tienda/menu-tienda.component';
import { DetalleTiendaComponent } from './detalle-tienda/detalle-tienda.component';
import { CrearTiendaComponent } from './crear-tienda/crear-tienda.component';



@NgModule({
  declarations: [
    MenuTiendaComponent,
    DetalleTiendaComponent,
    CrearTiendaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComunesModule
  ],
  exports:[
    MenuTiendaComponent,
    DetalleTiendaComponent,
    CrearTiendaComponent
  ]
})
export class TiendaModule { }