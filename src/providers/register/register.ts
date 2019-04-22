import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterProvider {

  private _url: string = "https://cosmic-app-v1.herokuapp.com/register";
  // private _url: string = "http://10.0.0.6:3000/register";

  constructor(private _http: HttpClient) {
  }

  public register(body: any): Observable<ArrayBuffer> {

    const options:any = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    return this._http.post(this._url, body, options);
  }
}
