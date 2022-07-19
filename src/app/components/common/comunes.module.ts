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
    TopTenListadoComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
    
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
    TopTenListadoComponent
  ],
  providers:[DatePipe]
})
export class ComunesModule { }
