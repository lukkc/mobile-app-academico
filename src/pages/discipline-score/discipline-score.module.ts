import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisciplineScorePage } from './discipline-score';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DisciplineScorePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(DisciplineScorePage),
  ],
  exports: [
    DisciplineScorePage
  ]
})
export class DisciplineScorePageModule {}
