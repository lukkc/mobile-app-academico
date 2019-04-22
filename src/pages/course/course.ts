import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Update } from '../../interfaces/Update';
import { EventEmitterService } from '../../emitters/EventEmitterService';

@IonicPage()
@Component({
    selector: 'page-course',
    templateUrl: 'course.html',
})
export class CoursePage implements Update {

    static title: string = "CoursePage";

    private _updateEventWatch: EventEmitter<any>;
    public theme: string;
    public courseInformation = {};

    constructor(
        private _storage: Storage,
        public navParams: NavParams
    ) {}


    ionViewDidLoad() {
        this._setTheme();
        this._course();
        this._watchForUpdates();
    }


    ionViewWillUnload() {
        this._unsubscribeWatch();
    }


    private _setTheme(): void {
        this.theme = this.navParams.get("theme");
    }


    _watchForUpdates(): void {
        this._updateEventWatch = EventEmitterService.getEvent("update").subscribe(() => {
            this._course();
        });
    }


    _unsubscribeWatch(): void {
        this._updateEventWatch.unsubscribe();
    }


    private _course(): void {
        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {

                let course: any = user["cursos"][0];

                this.courseInformation = {
                    name: course.nome,
                    shift: course.turno,
                    license: course.habilitacao,
                    dateEntry: course.data_ingresso,
                    coefficientYield: course.coeficiente_rendimento,
                    curriculum: course.matriz_curricular,
                    overallAverage: course.media_global,
                    situation: course.situacao,
                    typeTicket: course.tipo_ingresso
                }

            }).catch(erro => { return; });
        }).catch(erro => { return; });
    }

}
