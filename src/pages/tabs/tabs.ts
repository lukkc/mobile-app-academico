import { Component, EventEmitter } from '@angular/core';
import { HistoricPage } from '../historic/historic';
import { IonicPage, MenuController, NavParams } from 'ionic-angular';
import { AbsencePage } from '../absence/absence';
import { SchedulesPage } from '../schedules/schedules';
import { ScorePage } from '../score/score';
import { UpdateProvider } from '../../providers/update/update';
import { EventEmitterService } from '../../emitters/EventEmitterService';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    static title: string = "TabsPage";
    private themeEvent: EventEmitter<any>;
    public theme: string;

    schedulesPage: string = SchedulesPage.title
    scorePage: string = ScorePage.title;
    historicPage = HistoricPage.title;
    absencePage = AbsencePage.title;

    constructor(
        private _menu: MenuController,
        private _updateService: UpdateProvider,
        private _params: NavParams,
        private _localNotifications: LocalNotifications,
        private _storage: Storage,
    ) {
        this._setTheme();
    };


    ionViewDidLoad() {
        this._changeTheme();
        this._menu.swipeEnable(false);
        this._updateService.getUpdate();
        this._testNotificacao();
    }


    ionViewWillUnload() {
        this._unsubscribeThemeEvent();
    }


    private _setTheme(): void {
        this.theme = this._params.get("theme");
    }


    private _changeTheme(): void {
        this.themeEvent = EventEmitterService.getEvent("theme").subscribe(theme => {
            this.theme = theme;
        });
    }


    private _unsubscribeThemeEvent() {
        this.themeEvent.unsubscribe()
    }


    private _testNotificacao() {

         this._storage
        .ready()
        .then(() => {

            this._storage
            .get("isItToNotifyActivities")
            .then((isItToNotifyActivities) => {
 
                if(isItToNotifyActivities == null) {
                    this._storage.set("isItToNotifyActivities", true);
                }


                if(isItToNotifyActivities) {
                    setTimeout(() => {
                        this._localNotifications.schedule({
                            text: 'Delayed ILocalNotification',
                            trigger: {at: new Date(new Date().getTime() + 2000)},
                            led: 'FF0000',
                            sound: null
                         });
                    }, 2000);
                }

            });
        
        }).catch(() => { return;})
    }

}
