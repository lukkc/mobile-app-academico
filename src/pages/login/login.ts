import { Component, ErrorHandler, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Content } from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { AuthenticatedProvider } from "../../providers/authenticated/authenticated";
import { LoaderComponent } from "../../components/loader/loader";
import { AlertComponent } from "../../components/alert/alert";
import { RegisterPage } from "../register/register";

@IonicPage()
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {

    @ViewChild(Content) content: Content;

    static title = "LoginPage";
    public registration: string;
    public password: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _LoginService: LoginProvider,
        private _AuthenticatedService: AuthenticatedProvider,
        private _loader: LoaderComponent,
        private _alert: AlertComponent
    ) { }

    ionViewDidLoad() {
    }


    public login(): void {

        let body: any = {
            matricula: this.registration,
            senha: this.password
        };

        let loader = this._loader.loading(`Verificando autenticação.`);

        let erro: any = {
            title: "Alerta",
            subTitle: "Matricula ou senha estão incorretas.",
            timeout: 1500
        };

        loader.present();

        this._LoginService.login(body).subscribe(
            (resposta: any) => {
                let userData: any = {
                    user: resposta.usuario,
                    token: resposta.token
                };

                this._AuthenticatedService.auth(userData, body, loader, this.navCtrl, erro);
            },
            (error: ErrorHandler) => {
                setTimeout(() => {
                    loader.dismiss();
                }, 1500);

                this._alert.show(erro);
            }
        );
    }


    public register(): void {
        this.navCtrl.push(
            RegisterPage.title, {}, { animate: true }
        );
    }


    public scrollDownInputFocus(): void {
        this.content.scrollTo(0, 180);
    }
}
