import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalActualityPage } from './personal-actuality.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalActualityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalActualityPageRoutingModule {}
