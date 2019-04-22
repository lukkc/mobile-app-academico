import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-discipline-score',
    templateUrl: 'discipline-score.html',
})
export class DisciplineScorePage {

    static title: string = "DisciplineScorePage";
    public disciplineScore = {};
    public theme: string;

    constructor(
        private _navParams: NavParams,
        private _viewCtrl: ViewController
    ) {
    }


    ionViewDidLoad() {
        this._setTheme();
        this._setDisciplineScore();
    }


    private _setTheme(): void {
        this.theme = this._navParams.get("theme");
    }


    private _setDisciplineScore(): void {
        this.disciplineScore = this._navParams.get("disciplineScore");
    }


    public dismiss(): void {
        this._viewCtrl.dismiss();
    }

}
