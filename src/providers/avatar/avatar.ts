import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { FileTransferObject, FileTransfer, FileUploadOptions, FileUploadResult } from '@ionic-native/file-transfer';


@Injectable()
export class AvatarProvider {

    private _userID: string;
    private _token: string;

    constructor(
        private _http: HttpClient,
        private _storage: Storage,
        private _transfer: FileTransfer
    ) {
        this._getUserId();
        this._getToken();
    }


    public changeAvatar(newAvatarPath): Promise<FileUploadResult> {

        // private url: string = "https://cosmic-app-v1.herokuapp.com/register";
        let url: string = "http://10.0.0.6:3000/avatar/modify/" + this._userID;

        let fileTransfer: FileTransferObject = this._transfer.create();

        let options: FileUploadOptions = {
            fileKey: 'avatar',
            fileName: newAvatarPath,
            headers: {
                "Authorization": "Bearer " + this._token
            }
        }

        return fileTransfer.upload(newAvatarPath, url, options);

    }


    public removeAvatar(): Observable<ArrayBuffer> {

        // private url: string = "https://cosmic-app-v1.herokuapp.com/register";
        let url: string = "http://10.0.0.6:3000/avatar/delete/" + this._userID;

        const options: any = {
            headers: {
                "Authorization": "Bearer " + this._token
            }
        };

        return this._http.delete(url, options);
    }


    private _getToken() {
        this._storage.ready().then(() => {
            this._storage.get("token").then(token => {

                this._token = token;

            }).catch(() => { return; });
        }).catch(() => { return; });
    }


    private _getUserId() {
        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {

                this._userID = user._id;

            }).catch(() => { return; });
        }).catch(() => { return; });
    }

}
