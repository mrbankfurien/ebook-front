import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPosterPageRoutingModule } from './comment-poster-routing.module';

import { CommentPosterPage } from './comment-poster.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CommentPosterPageRoutingModule
  ],
  declarations: [CommentPosterPage]
})
export class CommentPosterPageModule {}
