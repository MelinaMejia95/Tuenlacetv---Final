import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Payments } from '../payment/payment'; 
import { AdPayments } from '../advancepayments/adpayment';

@Injectable()
export class PaymentsService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getPayment(){
    const url = this._global.url + `/pagos/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 getAdvancePayment(){
  const url = this._global.url + `/pagos_anticipados/bd/` + localStorage.getItem('db');
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  console.log(header)
  let options = new RequestOptions({ headers: header });
  return this._http.get(url, options).map(response =>{
      return response.json();
  })
}

 /**
    @return {Observable<Payments[]>} 
   */

  getPaymentsFilter(): Observable<Payments[]> {
    const url = this._global.url + `/pagos/bd/` + localStorage.getItem('db');
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      console.log(header)
      let options = new RequestOptions({ headers: header });
      return this._http.get(url, options).map(response =>{
          return response.json();
      })
   } 

   /**
    @return {Observable<AdPayments[]>} 
   */

  getAdPaymentsFilter(): Observable<AdPayments[]> {
    const url = this._global.url + `/pagos_anticipados/bd/` + localStorage.getItem('db');
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      console.log(header)
      let options = new RequestOptions({ headers: header });
      return this._http.get(url, options).map(response =>{
          return response.json();
      })
   } 


 deletePayment(codigo){
    const url = this._global.url + `/pagos/anular_pago/` + codigo;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')} });
    return this._http.post(url, { "db": localStorage.getItem('db') } ,options).map(response => response.json());
 }

 deleteAdPayment(codigo){
  const url = this._global.url + `/pagos_anticipados/anular_pago/` + codigo;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')} });
  return this._http.post(url, { "db": localStorage.getItem('db') } ,options).map(response => response.json());
}

 createPayment(content: object){
  console.log(content)
  const url = this._global.url + `/pagos`;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: content });
  return this._http.post(url, content, options).map(response => response.json());
 }

 createAdPayment(content: object){
  console.log(content)
  const url = this._global.url + `/pagos_anticipados`;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: content });
  return this._http.post(url, content, options).map(response => response.json());
  }

 getInfoFac(codigo){
    const url = this._global.url + `/pagos/detalle_facturas/`+ codigo + `/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 getInfoPay(){
  const url = this._global.url + `/pagos_anticipados/info/bd/` + localStorage.getItem('db');
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  console.log(header)
  let options = new RequestOptions({ headers: header });
  return this._http.get(url, options).map(response =>{
      return response.json();
  })
}

 downloadPayments(content){
    const url = this._global.url + `/pagos/listado_recibos`;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
   }

}
