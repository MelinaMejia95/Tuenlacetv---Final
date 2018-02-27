import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global'

@Injectable (

)
export class LoginService{

    constructor(private _http:Http, private _global: AppGlobals){
        console.log("Servicio listo")
     }

    login(content: object) {
        const url = this._global.url+ '/signin';
        return this._http.post(url, content).map(response => response.json());
    }

    logout(token: string){
        const url = this._global.url+ '/signout';
        return this._http.delete(url, token).map(response => response.json());
    }
}   