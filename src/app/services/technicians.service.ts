import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Techs } from '../technicians/technician' 

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

  createOrder(content){
    console.log(content)
    const url = this._global.url + `/ordenes`;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
  }

  updateOrder( content: object) {
    console.log(content)
    const url = this._global.url + `/ordenes/` + content['id'];
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header });
    return this._http.put(url, content, options).map(response => response.json());
  }

 /**
    @return {Observable<Techs[]>} 
   */

  getTechsFilter(): Observable<Techs[]> {
    const url = this._global.url + `/ordenes/bd/` + localStorage.getItem('db');
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      console.log(header)
      let options = new RequestOptions({ headers: header });
      return this._http.get(url, options).map(response =>{
          return response.json();
      })
   } 

   deleteOrder(codigo) {
    const url = this._global.url + `/ordenes/anular_orden/` + codigo;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')} });
    return this._http.post(url, { "db": localStorage.getItem('db') } ,options).map(response => response.json());
   }

   downloadOrder(content){
    const url = this._global.url + `/ordenes/listado_ordenes` ;
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: header, body: content });
    return this._http.post(url, content, options).map(response => response.json());
   }

}
