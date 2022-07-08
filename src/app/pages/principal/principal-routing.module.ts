import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage,
    children: [
      {
        path: 'home',
        // canActivate: [IsAuthGuard],
         loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'usuarios',
        // canActivate: [IsAuthGuard, HasRoleGuard],
        // data: {
        //   role: ['Admin']
        // },
         loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosPageModule),
      },
      {
        path: 'tickets',
        // canActivate: [IsAuthGuard],
        loadChildren: () => import('../tickets/tickets.module').then(m => m.TicketsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
