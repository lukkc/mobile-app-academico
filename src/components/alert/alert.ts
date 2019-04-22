import { Component } from "@angular/core";
import { AlertController } from "ionic-angular";

@Component({
    selector: "alert",
    templateUrl: "alert.html"
})
export class AlertComponent {

    constructor(private alertCtrl: AlertController) { }

    public show(options: any): void {
        setTimeout(() => {
            this.alertCtrl
                .create({
                    title: options.title,
                    subTitle: options.subTitle,
                    buttons: ["Ok"]
                })
                .present();
        }, options.timeout);
    }

}
