import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllUserPostePage } from './all-user-poste.page';

const routes: Routes = [
  {
    path: '',
    component: AllUserPostePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllUserPostePageRoutingModule {}
