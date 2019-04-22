import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailedHistoryPage } from '../detailed-history/detailed-history';
import { Update } from '../../interfaces/Update';
import { EventEmitterService } from '../../emitters/EventEmitterService';

@IonicPage()
@Component({
    selector: 'page-historic',
    templateUrl: 'historic.html',
})

export class HistoricPage implements Update {

    static title: string = "HistoricPage";

    public periods = [];
    private _updateEventWatch: EventEmitter<any>;
    private _themeEvent: EventEmitter<any>;
    public theme: string;

    constructor(
        private _navCtrl: NavController,
        private _storage: Storage,
        private _params: NavParams
    ) {
        this._setTheme();
    }


    ionViewDidLoad() {
        this._changeTheme();
        this._historic();
        this._watchForUpdates();
    }


    ionViewWillUnload() {
        this._unsubscribeThemeEvent();
        this._unsubscribeWatch();
    }


    _watchForUpdates(): void {
        this._updateEventWatch = EventEmitterService.getEvent("update").subscribe(() => {
            console.log('atualizando historico');
            this._historic();
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


    private _historic(): void {
        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {

                const periods = user["cursos"][0]["historico"];

                const periodNumber = {
                    "primeiro": "1º",
                    "segundo": "2º",
                    "terceiro": "3º",
                    "quarto": "4º",
                    "quinto": "5º",
                    "sexto": "6º",
                    "sétimo": "7º",
                    "oitavo": "8º",
                    "nono": "9º",
                    "décimo": "10º",
                };
                let periodsHistoric = [];


                periods.forEach(period => {

                    let imgStatus: string = 'assets/imgs/periodoAprovado.png';

                    period.disciplinas.forEach(discipline => {

                        if (discipline.status == "não concluido")
                            imgStatus = 'assets/imgs/periodoPendente.png'

                        if (discipline.status == "pendente")
                            imgStatus = 'assets/imgs/periodoNaoCursado.png';

                    });

                    periodsHistoric.push({
                        name: periodNumber[period.periodo],
                        imgStatus: imgStatus,
                        subjects: period.disciplinas
                    });

                });

                this.periods = periodsHistoric;

            }).catch(() => {
                return;
            })
        }).catch(() => {
            return;
        })
    }


    public periodDetails(period): void {
        this._navCtrl.push(DetailedHistoryPage.title, { period: period, theme: this.theme });
    }

}
