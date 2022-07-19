import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComunesModule } from 'src/app/components/common/comunes.module';
import { TicketModule } from 'src/app/components/ticket/ticket.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComunesModule,
    TicketModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
