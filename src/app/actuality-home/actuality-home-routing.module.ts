import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualityHomePage } from './actuality-home.page';

const routes: Routes = [
  {
    path: '',
    component: ActualityHomePage,
    children : [
        {
          path: 'personal-actuality',
          loadChildren: () => import('../personal-actuality/personal-actuality.module').then( m => m.PersonalActualityPageModule)
        },
        {
          path: 'all-user-poste',
          loadChildren: () => import('../all-user-poste/all-user-poste.module').then( m => m.AllUserPostePageModule)
        } ,
        {
          path: '',
          redirectTo: '/actuality-home/personal-actuality',
          pathMatch: 'full'
        }
    ]
  } ,
  {
    path: '',
    redirectTo: '/actuality-home/personal-actuality',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualityHomePageRoutingModule {}
