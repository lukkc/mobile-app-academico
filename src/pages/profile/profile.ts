import { Component, EventEmitter, ErrorHandler } from '@angular/core';
import { IonicPage, NavParams, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Personal } from '../../models/profile/personal';
import { Address } from '../../models/profile/address';
import { Filiation } from '../../models/profile/filiation';
import { Update } from '../../interfaces/Update';
import { EventEmitterService } from '../../emitters/EventEmitterService';
import { AvatarProvider } from '../../providers/avatar/avatar';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage implements Update {

    static title: string = "ProfilePage";
    private _updateEventWatch: EventEmitter<any>;

    public address: Address = {};
    public filiation: Filiation = {};
    public personalData: Personal = {};
    public avatar: string;
    public theme: string;

    constructor(
        private _navParams: NavParams,
        private _camera: Camera,
        private _storage: Storage,
        private _avatarService: AvatarProvider
    ) { }


    ionViewDidLoad() {
        this._setTheme();
        this._profile();
        this._watchForUpdates();
    }


    ionViewWillUnload() {
        this._unsubscribeWatch();
    }


    private _setTheme(): void {
        this.theme = this._navParams.get("theme");
    }


    _watchForUpdates(): void {
        this._updateEventWatch = EventEmitterService.getEvent("update").subscribe(() => {
            console.log('atualizando perfil');
            this._profile();
        })
    }

    _unsubscribeWatch(): void {
        this._updateEventWatch.unsubscribe();
    }


    private _profile(): void {
        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {


                let personalData: Personal = {
                    name: user.nome,
                    email: user.email.toString(),
                    birth: user.registro_nascimento.data_nascimento,
                    naturalness: user.registro_nascimento.naturalidade,
                    homeState: user.registro_nascimento.estado_natal,
                };

                let filiation: Filiation = {
                    mother: user.registro_nascimento.filiacao.mae,
                    father: user.registro_nascimento.filiacao.pai
                }

                let address: Address = {
                    country: user.endereco.pais,
                    state: user.endereco.estado,
                    city: user.endereco.cidade,
                    district: user.endereco.bairro,
                    street: user.endereco.logradouro,
                    number: user.endereco.numero,
                    complement: user.endereco.complemento,
                    zipCode: user.endereco.cep
                }

                this.personalData = personalData;
                this.filiation = filiation;
                this.address = address;
                this.avatar = user.avatar.url;

            }).catch(() => { return; });
        }).catch(() => { return; });
    }


    public takePicture(): void {

        const options: CameraOptions = {
            sourceType: this._camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true,
            destinationType: this._camera.DestinationType.FILE_URI,
            allowEdit: true,
            correctOrientation: true,
            quality: 80,
            targetWidth: 160,
            targetHeight: 160
        }

        this._camera.getPicture(options).then(imagemUri => {

            this._storage.ready().then(() => {
                this._storage.get("user").then(user => {

                    user.avatar.url = normalizeURL(imagemUri);


                    this._storage.set('user', user).then(() => {

                        let newAvatar: string = normalizeURL(imagemUri);

                        this.avatar = normalizeURL(imagemUri);

                        this._avatarService.changeAvatar(newAvatar)
                        .catch(erro => { return; });

                    }).catch((erro) => { return; });
                }).catch((erro) => { return; });
            }).catch((erro) => { return; });

            this._camera.cleanup().catch(() => { return; });

        })
        .catch(error => { return; });
    }


    public choosePhoto(): void {

        const options: CameraOptions = {
            sourceType: this._camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this._camera.DestinationType.FILE_URI,
            mediaType: this._camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true,
            quality: 80,
            targetWidth: 160,
            targetHeight: 160
        }

        this._camera.getPicture(options).then(imagemUri => {

            this._storage.ready().then(() => {
                this._storage.get("user").then(user => {

                    user.avatar.url = normalizeURL(imagemUri);

                    this._storage.set('user', user).then(() => {

                        let newAvatar: string = normalizeURL(imagemUri);

                        this.avatar = normalizeURL(imagemUri);

                        this._avatarService.changeAvatar(newAvatar)
                        .catch(erro => { return; });

                    }).catch(() => { return; });
                }).catch(() => { return; });
            }).catch(() => { return; });

        })
        .catch(error => { return; });
    }


    public removePhoto(): void {

        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {

                user.avatar.url = 'assets/imgs/avatarDefault.svg';

                this._storage.set('user', user).then(() => {

                    this.avatar = 'assets/imgs/avatarDefault.svg';

                    this._avatarService.removeAvatar()
                    .subscribe(() => {}, 
                    (errr: ErrorHandler) => { return; });

                }).catch(() => { return; });
            }).catch(() => { return; });
        }).catch(() => { return; });
    }

}
