import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable (

)
export class CountriesService{

    constructor(private _http:Http){
        console.log("Servicio listo")
     }

     /*login(user, clave) {
        const url = `http://localhost:3000/users/login/`+user+'/'+clave;
        return this._http.get(url).map(response =>{
            return response.json();
        })
    }*/
}   