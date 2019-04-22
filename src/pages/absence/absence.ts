import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Update } from '../../interfaces/Update';
import { EventEmitterService } from '../../emitters/EventEmitterService';

@IonicPage()
@Component({
    selector: 'page-absence',
    templateUrl: 'absence.html',
})
export class AbsencePage implements Update {

    static title: string = "AbsencePage";

    public subjects: any[] = [];
    private _updateEventWatch: EventEmitter<any>;
    private _themeEvent: EventEmitter<any>;
    public theme: string;

    constructor(
        public navCtrl: NavController,
        private _params: NavParams,
        private _storage: Storage,
    ) {
        this._setTheme();
    }


    ionViewDidLoad() {
        this._changeTheme();
        this._absences();
        this._watchForUpdates();
    }


    ionViewWillUnload() {
        this._unsubscribeThemeEvent();
        this._unsubscribeWatch();
    }


    _watchForUpdates(): void {
        this._updateEventWatch = EventEmitterService.getEvent("update").subscribe(() => {
            this._absences();
        });
    }


    _unsubscribeWatch(): void {
        this._updateEventWatch.unsubscribe();
    }


    private _setTheme(): void {
        this.theme = this._params.data;
    }


    private _changeTheme(): void {
        this._themeEvent = EventEmitterService.getEvent("theme").subscribe(theme => {
            this.theme = theme;
        });
    }


    private _unsubscribeThemeEvent(): void {
        this._themeEvent.unsubscribe()
    }


    private _absences(): void {
        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {

                let subjects: any = user["cursos"][0]["periodo_atual"]["disciplinas"];
                let absences: any[] = [];

                subjects.forEach((discipline) => {

                    absences.push({
                        width: this._computesPercentageAbsence(discipline.faltasPorcentagem) + '%',
                        name: discipline.nome,
                        percentage: discipline.faltasPorcentagem,
                        missed: discipline.faltasQuantidade
                    });

                });

                this.subjects = absences;

            }).catch(erro => {return;});
        }).catch(erro => {return;});
    }


    private _computesPercentageAbsence(absence: string): number {
        return parseFloat(absence) / 25 * 100;
    }


    public progressBarControl(percentage): any {

        percentage = this._computesPercentageAbsence(percentage);

        const style = {
            "width": percentage + "%",
        }

        if (percentage >= 60 && percentage < 90)
            style["background"] = "#d0b43f";

        if (percentage >= 90)
            style["background"] = "#b32222";

        return style;
    }


    public indicatorControl(percentage): any {

        percentage = this._computesPercentageAbsence(percentage);

        let style = {
            "padding-left": (percentage - 3) + "%"
        };

        if (percentage > 9)
            style["padding-left"] = (percentage - 10) + "%";

        if (percentage > 90)
            style["padding-left"] = (percentage - 18) + "%";

        if (percentage >= 60 && percentage < 90)
            style["color"] = "#d0b43f";

        if (percentage >= 90)
            style["color"] = "#b32222";

        return style;
    }

}
