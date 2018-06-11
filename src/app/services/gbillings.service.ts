import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GBillings } from '../gbillings/gbillings';
import { saveAs } from 'file-saver';

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

  getInfoGbillings(){
    const url = this._global.url + `/facturacion/info/bd/` + localStorage.getItem('db');
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
    const url = this._global.url + `/facturacion/listado_fras_venta`;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
   }

   printGBillings(content){
     console.log(content)
    const url = this._global.url + `/facturacion/generar_impresion.pdf`;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content, responseType: ResponseContentType.Blob });
    return this._http.post(url, content, options).map(response => this.saveToFileSystem(response));
   }

   private saveToFileSystem(response) {
    response.responseType = ResponseContentType.Blob;
    const filename = "Facturas";
    const blob = new Blob([response._body], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

}
