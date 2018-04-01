import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Subs } from '../subscriber/subs'

@Injectable()
export class SubscribersService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getSubscribers(entity){
    const url = this._global.url + `/senales/` + entity + `/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 getEntities(entity){
  const url = this._global.url + `/senales/entidades/` + entity + `/` + localStorage.getItem('db');
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  console.log(header)
  let options = new RequestOptions({ headers: header });
  return this._http.get(url, options).map(response =>{
      return response.json();
  })
}

 /**
    @return {Observable<Subs[]>} 
   */

 getSubsFilter(entity): Observable<Subs[]> {
  const url = this._global.url + `/senales/` + entity +`/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 updateSubscribers(content: object){
   console.log(content)
  const url = this._global.url + `/senales/` + content['id'];
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header });
  return this._http.put(url, content, options).map(response => response.json());
 }
 
 deleteSubscribers(code: string){
  const url = this._global.url + `/senales/` + code;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')  } });
  return this._http.delete(url, options).map(response => response.json());
 }

 createSubscribers(content: object){
   console.log(content)
  const url = this._global.url + `/senales`;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: content });
  return this._http.post(url, content, options).map(response => response.json());
 }

 createBills(content: object){
  console.log(content)
  const url = this._global.url + `/facturacion/factura_manual`;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: content });
  return this._http.post(url, content, options).map(response => response.json());
}

 downloadSubscriber(){
  const url = this._global.url + `/senales/listado/` + localStorage.getItem('db');
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header });
  return this._http.get(url, options).map(response =>{
    return response.json();
  })
 }

}
 