import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';

@Injectable()
export class CountriesService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getCountries(){
    const url = this._global.url + `/paises/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 updateCountries(content: object){
  const url = this._global.url + `/paises/` + content['id'];
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header });
  return this._http.put(url, content, options).map(response => response.json());
 }

 deleteCountries(code: string){
  const url = this._global.url + `/paises/` + code;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')  } });
  return this._http.delete(url, options).map(response => response.json());
 }

 createCountries(content: object){
  const url = this._global.url + `/paises`;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db') } });
  return this._http.post(url, content, options).map(response => response.json());
 }

}
