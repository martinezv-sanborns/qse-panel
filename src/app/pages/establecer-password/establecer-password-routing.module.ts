import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablecerPasswordPage } from './establecer-password.page';

const routes: Routes = [
  {
    path: '',
    component: EstablecerPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstablecerPasswordPageRoutingModule {}
