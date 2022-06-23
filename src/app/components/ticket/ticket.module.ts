import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { MenuTicketComponent } from './menu-ticket/menu-ticket.component';
import { ComunesModule } from '../common/comunes.module';
import { DetalleTicketComponent } from './detalle-ticket/detalle-ticket.component';
import { SeguimientoTicketComponent } from './seguimiento-ticket/seguimiento-ticket.component';


@NgModule({
  declarations: [
    MenuTicketComponent,
    DetalleTicketComponent,
    SeguimientoTicketComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComunesModule
  ],
  exports:[
    MenuTicketComponent,
    DetalleTicketComponent,
    SeguimientoTicketComponent
  ]
})
export class TicketModule { }