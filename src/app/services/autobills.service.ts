import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
/* import { Banks } from '../banks/banks' */

@Injectable()
export class AutoBillsService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getInfo(){
    const url = this._global.url + `/facturacion/info/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 createAutobills(content: object){
    console.log(content)
    const url = this._global.url + `/facturacion`;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
 } 

}
