import { Component, EventEmitter } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { DisciplineScorePage } from '../discipline-score/discipline-score';
import { Storage } from '@ionic/storage';
import { Update } from '../../interfaces/Update';
import { EventEmitterService } from '../../emitters/EventEmitterService';

@IonicPage()
@Component({
    selector: 'page-score',
    templateUrl: 'score.html',
})
export class ScorePage implements Update {

    static title: string = "ScorePage";
    private _updateEventWatch: EventEmitter<any>;
    private _themeEvent: EventEmitter<any>;
    public theme: string;
    public subjectsScore = [];

    constructor(
        private _modalCtrl: ModalController,
        private _storage: Storage,
        private _params: NavParams
    ) {
        this._setTheme();
    }


    ionViewDidLoad() {
        this._changeTheme();
        this._score();
        this._watchForUpdates();
    }


    ionViewWillUnload() {
        this._unsubscribeThemeEvent();
        this._unsubscribeWatch();
    }


    _watchForUpdates(): void {
        this._updateEventWatch = EventEmitterService.getEvent("update").subscribe(() => {
            console.log("atualizando Notas");
            this._score();
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


    private _score(): void {
        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {

                const subjects: any = user["cursos"][0]["periodo_atual"]["disciplinas"];
                const subjectsScore: any[] = [];

                subjects.forEach(discipline => {

                    const disciplineName: string = discipline.nome;
                    const disciplineScore: any = discipline.notas;

                    subjectsScore.push({
                        name: disciplineName,
                        score: disciplineScore
                    })

                });

                this.subjectsScore = subjectsScore;

            }).catch(() => { return; });
        }).catch(() => { return; });
    }
    

    public scoreModal(disciplineScore): void {

        let disciplineScoreModal = this._modalCtrl.create(
            DisciplineScorePage.title,
            { disciplineScore: disciplineScore, theme: this.theme }
        );

        disciplineScoreModal.present();
    }

}
