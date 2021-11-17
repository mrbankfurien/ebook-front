import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentPosterPage } from './comment-poster.page';

const routes: Routes = [
  {
    path: '',
    component: CommentPosterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentPosterPageRoutingModule {}
