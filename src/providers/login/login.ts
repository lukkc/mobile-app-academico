import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginProvider {

  private _url: string = "https://cosmic-app-v1.herokuapp.com/login";
  // private _url: string = "http://10.0.0.6:3000/login";

  constructor(private _http: HttpClient) {}

  public login(body: any): Observable<ArrayBuffer> {

    const options:any = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    return this._http.post(this._url, body, options);
  }

}
