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


@NgModule({
  declarations: [
    HeaderComponent,
    OlvidePasswordComponent,
    ShowPasswordHideComponent
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
    ShowPasswordHideComponent
  ],
  providers:[DatePipe]
})
export class ComunesModule { }