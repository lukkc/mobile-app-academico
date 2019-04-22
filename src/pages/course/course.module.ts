import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoursePage } from './course';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CoursePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CoursePage),
  ],
  exports: [
    CoursePage
  ]
})
export class CoursePageModule {}
