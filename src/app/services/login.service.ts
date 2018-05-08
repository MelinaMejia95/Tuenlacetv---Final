import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global'
import { Headers } from '@angular/http';

@Injectable (

)
export class LoginService{

    constructor(private _http:Http, private _global: AppGlobals){
        console.log("Servicio listo")
     }

    login(content: object) {
        console.log(content)
        const url = this._global.url+ '/signin';
        return this._http.post(url, content).map(response => response.json());
    }

    logout(token: string){
        const url = this._global.url+ '/signout';
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + token);
        let options = new RequestOptions({ headers: header });
        return this._http.delete(url, options).map(response => response.json());
    }
}   