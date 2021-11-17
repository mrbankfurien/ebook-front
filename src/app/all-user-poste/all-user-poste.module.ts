import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllUserPostePageRoutingModule } from './all-user-poste-routing.module';

import { AllUserPostePage } from './all-user-poste.page';

import { NotePosteComponent } from '../component/note-poste/note-poste.component' ;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllUserPostePageRoutingModule
  ],
  declarations: [AllUserPostePage, NotePosteComponent]
})
export class AllUserPostePageModule {}
