import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { CoursePage } from '../pages/course/course';
import { SettingsPage } from '../pages/settings/settings';
import { EventEmitterService } from '../emitters/EventEmitterService';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('nav') nav: NavController;

    rootPage: any;
    public theme: string;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private _storage: Storage
    ) {

        platform.ready().then(() => {
            statusBar.styleBlackOpaque();
            splashScreen.hide();
        });

        this._setTheme();
        this._changeTheme();
        this._inicialPage();

    }


    private _setTheme(): void {
        this._storage.ready().then(() => {
            this._storage.get("theme").then(theme => {

                if (!theme)
                    theme = "light";

                this.theme = theme;

            }).catch(() => {
                this.theme = "light";
            });
        }).catch(erro => {
            this.theme = "light";
        });
    }


    private _changeTheme(): void {
        EventEmitterService.getEvent("theme").subscribe(theme => {
            this.theme = theme;
        });
    }


    private _inicialPage(): void {
        this._storage
            .ready()
            .then(() => {
                this._storage.get("token").then(token => {

                    if (token) {
                        this._storage.get("theme").then(theme => {

                            if (!theme)
                                theme = "light";

                            this.nav.setRoot(TabsPage.title, { theme: theme });

                        }).catch(() => {
                            this.nav.setRoot(TabsPage.title, { theme: "light" });
                        });

                    } else {
                        this.rootPage = LoginPage.title;
                    }


                }).catch(() => {
                    return;
                });
            }).catch(() => {
                return;
            });
    }


    public pushCourse(): void {
        this._getThemeAndPushPage(CoursePage.title);
    }


    public pushProfile(): void {
        this._getThemeAndPushPage(ProfilePage.title);
    }


    public pushSettings(): void {
        this._getThemeAndPushPage(SettingsPage.title);
    }


    public logout(): void {
        this._storage.ready().then(() => {
            this._storage.clear().then(() => {
                this.nav.setRoot(LoginPage.title);
            });
        });
    }


    private _getThemeAndPushPage(page: string): void {
        this._storage.get("theme").then(theme => {

            if (!theme)
                theme = "light";

            this.nav.push(page, { theme: theme });

        }).catch(() => {
            this.nav.push(page, { theme: "light" });
        });
    }

}
