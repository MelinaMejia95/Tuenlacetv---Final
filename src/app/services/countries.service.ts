import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';

@Injectable()
export class CountriesService {

  constructor(private _http:Http, private _global: AppGlobals) { }

  getCountries(){
    const url = this._global.url + `/paises`;
    return this._http.get(url).map(response =>{
        return response.json();
    })
 }


}
