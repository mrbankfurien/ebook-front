import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualityHomePageRoutingModule } from './actuality-home-routing.module';

import { ActualityHomePage } from './actuality-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualityHomePageRoutingModule
  ],
  declarations: [ActualityHomePage]
})
export class ActualityHomePageModule {}
