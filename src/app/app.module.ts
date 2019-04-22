import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { RegisterProvider } from '../providers/register/register';
import { LoaderComponent } from '../components/loader/loader';
import { AlertComponent } from '../components/alert/alert';
import { LoginProvider } from '../providers/login/login';
import { AuthenticatedProvider } from '../providers/authenticated/authenticated';
import { UpdateProvider } from '../providers/update/update';
import { AvatarProvider } from '../providers/avatar/avatar';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      swipeBackEnabled: false,
      platforms: {
        ios: {
          backButtonText: 'Voltar'
        }
      }
    }),
    IonicStorageModule.forRoot({
      name: '__helpi',
         driverOrder: ['indexeddb', 'websql', 'sqlite']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    File,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterProvider,
    LoaderComponent,
    AlertComponent,
    LoginProvider,
    AuthenticatedProvider,
    UpdateProvider,
    AvatarProvider
  ]
})
export class AppModule {}
