import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaPageRoutingModule } from './tienda-routing.module';

import { TiendaPage } from './tienda.page';
import { TiendaModule } from 'src/app/components/tienda/tienda.module';
import { ComunesModule } from 'src/app/components/common/comunes.module';
import { TicketModule } from '../../components/ticket/ticket.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaPageRoutingModule,
    TiendaModule,
    ComunesModule,
    TicketModule
  ],
  declarations: [TiendaPage]
})
export class TiendaPageModule {}
