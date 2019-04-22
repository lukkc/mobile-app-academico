import { NgModule } from '@angular/core';
import { OwnNamePipe } from './own-name/own-name';
import { DatePtPipe } from './datept/datept';
import { ZipCodePipe } from './zip-code/zip-code';
import { SchoolYearPipe } from './school-year/school-year';
import { DecimalPlacesPipe } from './decimal-places/decimal-places';
@NgModule({
	declarations: [
		OwnNamePipe,
		DatePtPipe,
    ZipCodePipe,
    SchoolYearPipe,
    DecimalPlacesPipe
	],
	imports: [],
	exports: [
		OwnNamePipe,
		DatePtPipe,
    ZipCodePipe,
    SchoolYearPipe,
    DecimalPlacesPipe
	]
})
export class PipesModule {}
