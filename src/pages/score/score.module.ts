import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScorePage } from './score';

@NgModule({
  declarations: [
    ScorePage,
  ],
  imports: [
    IonicPageModule.forChild(ScorePage),
  ],
  exports: [
    ScorePage
  ]
})
export class ScorePageModule {}
