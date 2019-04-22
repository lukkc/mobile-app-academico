import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedHistoryPage } from './detailed-history';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DetailedHistoryPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(DetailedHistoryPage),
  ],
  exports: [
    DetailedHistoryPage
  ]
})
export class DetailedHistoryPageModule {}
