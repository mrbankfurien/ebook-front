import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalActualityPageRoutingModule } from './personal-actuality-routing.module';

import { PersonalActualityPage } from './personal-actuality.page';

import { NotePosteComponent } from '../component/note-poste/note-poste.component' ;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalActualityPageRoutingModule
  ],
  declarations: [PersonalActualityPage , NotePosteComponent]
})
export class PersonalActualityPageModule {}
