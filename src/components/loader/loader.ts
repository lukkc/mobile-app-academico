import { Component } from '@angular/core';
import { LoadingController, Loading, LoadingOptions } from 'ionic-angular';

@Component({
    selector: 'loader',
    templateUrl: 'loader.html'
})
export class LoaderComponent {

    constructor(private _loadingCtrl: LoadingController) { }

    public loading(content: string): Loading {

        let options: LoadingOptions = {
            spinner: 'bubbles',
            content: content
        }

        return this._loadingCtrl.create(options);
    }

}
