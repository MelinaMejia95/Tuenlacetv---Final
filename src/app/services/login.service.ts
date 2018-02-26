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

     /*login(user, clave) {
        const url = `http://localhost:3000/users/login/`+user+'/'+clave;
        return this._http.get(url).map(response =>{
            return response.json();
        })
    }*/
}   