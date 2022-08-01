import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsPageRoutingModule } from './tickets-routing.module';

import { TicketsPage } from './tickets.page';
import { TicketModule } from '../../components/ticket/ticket.module';
import { ComunesModule } from '../../components/common/comunes.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsPageRoutingModule,
    TicketModule,
    ComunesModule,
    PipesModule
  ],
  declarations: [TicketsPage]
})
export class TicketsPageModule {}
