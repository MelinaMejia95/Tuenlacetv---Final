import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
/* import { Rates } from '../rates/rates' */

@Injectable()
export class TechniciansService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getTechs(){
    const url = this._global.url + `/ordenes/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
  }

  getInfoTechs(){
    const url = this._global.url + `/ordenes/info/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
  }

 /**
    @return {Observable<Rates[]>} 
   */

  /* getRatesFilter(): Observable<Rates[]> {
    const url = this._global.url + `/tarifas/bd/` + localStorage.getItem('db');
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      console.log(header)
      let options = new RequestOptions({ headers: header });
      return this._http.get(url, options).map(response =>{
          return response.json();
      })
   } */


}
