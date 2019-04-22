import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';
import { HistoryDisciplinePage } from '../history-discipline/history-discipline';

@IonicPage()
@Component({
    selector: 'page-detailed-history',
    templateUrl: 'detailed-history.html',
})
export class DetailedHistoryPage {

    @ViewChild(Content) content: Content;

    static title: string = "DetailedHistoryPage";
    public period: any = {};
    public theme: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _modalCtrl: ModalController
    ) {}


    ionViewDidLoad() {
        this._setTheme();
        this._setSubjects();
    }


    ionViewWillLeave() {
        this._goBackRoot();
    }


    private _goBackRoot(): void {
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.popToRoot();
        }
    }


    private _setTheme(): void {
        this.theme = this.navParams.get("theme");
    }


    private _setSubjects(): void {
        let period = this.navParams.get("period");

        this.period = period;
    }


    public modalDisciplineDetails(discipline) {
        
        let disciplineScoreModal = this._modalCtrl.create(
            HistoryDisciplinePage.title,
            { discipline: discipline, theme: this.theme }
          );
      
          disciplineScoreModal.present();
    }

}
