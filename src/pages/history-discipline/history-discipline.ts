import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-history-discipline',
    templateUrl: 'history-discipline.html',
})
export class HistoryDisciplinePage {

    static title: string = "HistoryDisciplinePage";
    public discipline: any = {};
    public theme: string;

    constructor(
        private _navParams: NavParams,
        private _viewCtrl: ViewController
    ) {
        this._setTheme();
    }


    ionViewDidLoad() {
        this._setDiscipline();
    }


    private _setTheme(): void {
        this.theme = this._navParams.get("theme");
    }


    private _setDiscipline(): void {
        this.discipline = this._navParams.get("discipline");
    }


    public dismiss() {
        this._viewCtrl.dismiss();
    }

}
