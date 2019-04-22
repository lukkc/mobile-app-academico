import { HttpClient } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EventEmitterService } from '../../emitters/EventEmitterService';

@Injectable()
export class UpdateProvider {

    // private _url: string = "http://10.0.0.6:3000/sync";
    private _url: string = "https://cosmic-app-v1.herokuapp.com/sync";

    constructor(
        private _http: HttpClient,
        private _storage: Storage
    ) { }

    public getUpdate(): void {

        let options: any = {};
        let body: any = {};

        this._storage
            .ready()
            .then(() => {

                this._storage.get("token").then(token => {

                    options = {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        }
                    };

                }).catch(() => { return; });

                this._storage.get("userAuth").then(userAuth => {

                    body = {
                        matricula: userAuth.matricula,
                        senha: userAuth.senha
                    };

                }).catch(() => { return; });

                this._storage.get("updatedControl").then(canUpdate => {

                    if (!canUpdate) {
                        this._storage.set("updatedControl", true);
                        return;
                    }

                    this._storage.set("updatedControl", false);

                    this._http.post(this._url, body, options)
                        .subscribe(
                            (resposta: any) => {

                                this._storage.get("user").then(user => {

                                    resposta.usuario.avatar = user.avatar;
                                    console.log(resposta.usuario)
                                    this._storage.set("user", resposta.usuario);
                                    this._storage.set("updatedControl", true);
                                    EventEmitterService.getEvent("update").emit();
                                    return;

                                }).catch(() => { return; });
                            },
                            (error: ErrorHandler) => {
                                this._storage.set("updatedControl", true);
                                return;
                            }
                        );

                }).catch(() => { return; });
            }).catch(() => { return; });
    }

}
