import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GBillings } from '../gbillings/gbillings'

@Injectable()
export class GBillingsService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getGbillings(){
    const url = this._global.url + `/facturacion/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
  }

 /**
    @return {Observable<GBillings[]>} 
   */

  getGBillingsFilter(): Observable<GBillings[]> {
    const url = this._global.url + `/facturacion/bd/` + localStorage.getItem('db');
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      console.log(header)
      let options = new RequestOptions({ headers: header });
      return this._http.get(url, options).map(response =>{
          return response.json();
      })
   }

   downloadGBillings(content){
    const url = this._global.url + `facturacion/listado_fras_venta`;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
   }

}
