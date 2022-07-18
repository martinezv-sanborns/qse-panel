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



@NgModule({
  declarations: [
    HeaderComponent,
    OlvidePasswordComponent,
    ShowPasswordHideComponent,
    CadenaSelectorComponent,
    MenuPerfilComponent,
    TopTenComponent
    
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    OlvidePasswordComponent,
    ShowPasswordHideComponent,
    CadenaSelectorComponent,
    MenuPerfilComponent,
    TopTenComponent
  ],
  providers:[DatePipe]
})
export class ComunesModule { }