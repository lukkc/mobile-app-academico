import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader';
import { AlertComponent } from './alert/alert';

@NgModule({
    declarations: [
        LoaderComponent,
        AlertComponent,
    ],
	imports: [],
	exports: [
        LoaderComponent,
        AlertComponent,
    ]
})
export class ComponentsModule {}
