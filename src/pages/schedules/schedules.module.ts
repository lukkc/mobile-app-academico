import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulesPage } from './schedules';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SchedulesPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(SchedulesPage),
  ],
  exports: [
    SchedulesPage
  ]
})
export class SchedulesPageModule {}
