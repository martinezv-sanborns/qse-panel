import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules


// components
import { HeaderComponent } from './header/header.component';
import { OlvidePasswordComponent } from './olvide-password/olvide-password.component';
import { ShowPasswordHideComponent } from './show-password-hide/show-password-hide.component';
import { CadenaSelectorComponent } from './cadena-selector/cadena-selector.component';
import { MenuPerfilComponent } from './menu-perfil/menu-perfil.component';
import { TopTenComponent } from './top-ten/top-ten.component';
import { NoHayResultadosComponent } from './no-hay-resultados/no-hay-resultados.component';
import { EstatusColorComponent } from './estatus-color/estatus-color.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TopTenListadoComponent } from './top-ten-listado/top-ten-listado.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { TiposTicketComponent } from './tipos-ticket/tipos-ticket.component';
import Swiper from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';



@NgModule({
  declarations: [
    HeaderComponent,
    OlvidePasswordComponent,
    ShowPasswordHideComponent,
    CadenaSelectorComponent,
    MenuPerfilComponent,
    TopTenComponent,
    NoHayResultadosComponent,
    EstatusColorComponent,
    TopTenListadoComponent,
    MenuUsuarioComponent,
    TiposTicketComponent,
    CrearUsuarioComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SwiperModule 
  ],
  exports:[
    HeaderComponent,
    OlvidePasswordComponent,
    ShowPasswordHideComponent,
    CadenaSelectorComponent,
    MenuPerfilComponent,
    TopTenComponent,
    NoHayResultadosComponent,
    EstatusColorComponent,
    TopTenListadoComponent,
    MenuUsuarioComponent,
    TiposTicketComponent,
    CrearUsuarioComponent
  ],
  providers:[DatePipe]
})
export class ComunesModule { }
