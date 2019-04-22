import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbsencePage } from './absence';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AbsencePage
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AbsencePage),
  ],
  exports: [
    AbsencePage
  ]
})
export class AbsencePageModule {}
