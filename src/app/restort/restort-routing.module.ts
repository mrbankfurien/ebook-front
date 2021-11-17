import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestortPage } from './restort.page';

const routes: Routes = [
  {
    path: '',
    component: RestortPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestortPageRoutingModule {}
