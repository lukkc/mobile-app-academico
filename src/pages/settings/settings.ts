import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EventEmitterService } from '../../emitters/EventEmitterService';


@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {

    static title: string = "SettingsPage";

    public theme: string;
    public isItToNotifyActivities: boolean;

    constructor(
        private _storage: Storage,
        private _params: NavParams
    ) { }


    ionViewDidLoad() {
        this._setTheme();
        this._setIsItToNotifyActivities();
    }


    private _setTheme(): void {
        this.theme = this._params.get("theme");
    };


    public chooseTheme(): void {
        this._storage.set("theme", this.theme);
        EventEmitterService.getEvent("theme").emit(this.theme);
    };

    private _setIsItToNotifyActivities() {
        this._storage
        .ready()
        .then(() => {

            this._storage
            .get("isItToNotifyActivities")
            .then((isItToNotifyActivities) => {

                if(isItToNotifyActivities) {
                    this.isItToNotifyActivities = isItToNotifyActivities;
                }

            });
        
        }).catch(() => { return;})
    }

    public notificationOfActivities(): void {
        console.log("notificação de atividades: " + this.isItToNotifyActivities);

        this._storage
        .ready()
        .then(() => {

            this._storage.set("isItToNotifyActivities", this.isItToNotifyActivities);
        
        }).catch(() => { return;})

        
    }

}
