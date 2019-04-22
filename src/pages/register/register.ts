import { Component, ErrorHandler, ViewChild } from "@angular/core";
import { IonicPage, NavController, Content } from "ionic-angular";
import { RegisterProvider } from "../../providers/register/register";
import { LoaderComponent } from "../../components/loader/loader";
import { AlertComponent } from "../../components/alert/alert";
import { AuthenticatedProvider } from "../../providers/authenticated/authenticated";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})

export class RegisterPage {

  @ViewChild(Content) content: Content;

  static title: string = "RegisterPage";
  public registration: string;
  public password: string;

  constructor(
    private _navCtrl: NavController,
    private _RegisterService: RegisterProvider,
    private _loader: LoaderComponent,
    private _alert: AlertComponent,
    private _AuthenticatedService: AuthenticatedProvider
    ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  public register(): void {
    
    let body: any = {
      matricula: this.registration,
      senha: this.password
    };
    
    let loader = this._loader
            .loading(`Aguarde um pouco.<br> Estamos
                      tentando carregar seus dados.`);

    let erro: any = {
      title: 'Alerta',
      subTitle: 'Não foi possivel carregar seus dados.',
      timeout: 2000
    }

    loader.present();

    this._RegisterService.register(body).subscribe(
      (resposta: any) => {
        
        let userData: any = {
          user: resposta.usuario,
          token: resposta.token
        }

        this._AuthenticatedService.auth(userData, body, loader, this._navCtrl, erro);
      },
      (error: ErrorHandler) => {

        setTimeout(() => {
          loader.dismiss();
        }, 2000);
        
        this._alert.show(erro);
      }
    );
  }

  public scrollDownInputFocus(): void {
    this.content.scrollTo(0, 254); 
  }
}
