import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestortPageRoutingModule } from './restort-routing.module';

import { RestortPage } from './restort.page';

import { OverlayComponent } from '../component/overlay/overlay.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RestortPageRoutingModule
  ],
  declarations: [RestortPage , OverlayComponent]
})
export class RestortPageModule {}
