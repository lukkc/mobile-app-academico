import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryDisciplinePage } from './history-discipline';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    HistoryDisciplinePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(HistoryDisciplinePage),
  ],
  exports: [
    HistoryDisciplinePage
  ]
})
export class HistoryDisciplinePageModule {}
