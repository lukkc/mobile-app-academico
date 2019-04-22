import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Loading, NavController } from "ionic-angular";
import { AlertComponent } from "../../components/alert/alert";
import { TabsPage } from "../../pages/tabs/tabs";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import { EventEmitterService } from "../../emitters/EventEmitterService";


@Injectable()
export class AuthenticatedProvider {

  constructor(
    private _storage: Storage,
    private _alert: AlertComponent,
    private _transfer: FileTransfer,
    private _file: File
  ) {}

  public auth(userData: any, body: any, loader: Loading, navCtrl: NavController, error: any): void {

    let fileTransfer: FileTransferObject = this._transfer.create();

    this._storage
      .ready()
      .then(() => {
    
        let url: string = userData.user.avatar.url;
        let fileType = url.replace(/^([\W]*[\w]*[\d]*)*(\.(png|svg|jpg|jpeg))$/ig, '$2');
        let fileName = userData.user._id + fileType;
        
        fileTransfer.download(url, this._file.dataDirectory + fileName).then((entry) => {

          userData.user.avatar.url = entry.toURL();

          this._presets(userData.user, userData.token, body);
          loader.dismiss();
          navCtrl.setRoot(TabsPage.title, {theme: "light"});

        }, (error) => {
          this._presets(userData.user, userData.token, body);
          loader.dismiss();
          navCtrl.setRoot(TabsPage.title, {theme: "light"});
        });

        EventEmitterService.getEvent("theme").emit("light");


        // retirar quando for buildar a app, so serve para testar no navegador
        this._presets(userData.user, userData.token, body);
        loader.dismiss();
        navCtrl.setRoot(TabsPage.title, {theme: "light"});


      })
      .catch(error => {
        setTimeout(() => {
          loader.dismiss();
        }, 2000);

        this._alert.show({
          title: error.title,
          subTitle: error.subTitle
        });
      });
  }


  private _presets(user: any, token: string, userAuth: any) {
    this._storage.set("user", user);
    this._storage.set("token", token);
    this._storage.set("theme", "light");
    this._storage.set("userAuth", userAuth);
    this._storage.set("updatedControl", false);
  }
}
