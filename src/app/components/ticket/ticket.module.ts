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
import { MenuDetalleCasoComponent } from './menu-detalle-caso/menu-detalle-caso.component';
import { NumeroTicketTiendaComponent } from './numero-ticket-tienda/numero-ticket-tienda.component';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    MenuTicketComponent,
    DetalleTicketComponent,
    SeguimientoTicketComponent,
    EstatusMotivoTicketComponent,
    MenuDetalleCasoComponent,
    NumeroTicketTiendaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComunesModule,
    PipesModule
  ],
  exports:[
    MenuTicketComponent,
    DetalleTicketComponent,
    SeguimientoTicketComponent,
    EstatusMotivoTicketComponent,
    MenuDetalleCasoComponent,
    NumeroTicketTiendaComponent
  ]
})
export class TicketModule { }
