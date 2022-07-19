import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComunesModule } from '../common/comunes.module';

// components
import { MenuTicketComponent } from './menu-ticket/menu-ticket.component';
import { DetalleTicketComponent } from './detalle-ticket/detalle-ticket.component';
import { SeguimientoTicketComponent } from './seguimiento-ticket/seguimiento-ticket.component';
import { EstatusMotivoTicketComponent } from './estatus-motivo-ticket/estatus-motivo-ticket.component';
import { TiposTicketComponent } from './tipos-ticket/tipos-ticket.component';
import { MenuDetalleCasoComponent } from './menu-detalle-caso/menu-detalle-caso.component';


@NgModule({
  declarations: [
    MenuTicketComponent,
    DetalleTicketComponent,
    SeguimientoTicketComponent,
    EstatusMotivoTicketComponent,
    TiposTicketComponent,
    MenuDetalleCasoComponent
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
    SeguimientoTicketComponent,
    EstatusMotivoTicketComponent,
    TiposTicketComponent,
    MenuDetalleCasoComponent
  ]
})
export class TicketModule { }
