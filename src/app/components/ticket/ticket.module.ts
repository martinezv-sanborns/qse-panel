import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { MenuTicketComponent } from './menu-ticket/menu-ticket.component';
import { ComunesModule } from '../common/comunes.module';


@NgModule({
  declarations: [
    MenuTicketComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComunesModule
  ],
  exports:[
    MenuTicketComponent
  ]
})
export class TicketModule { }