import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cities } from '../cities/cities'

@Injectable()
export class CitiesService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getCities(){
    const url = this._global.url + `/ciudades/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 /**
    @return {Observable<Cities[]>} 
   */

  getCitiesFilter(): Observable<Cities[]> {
    const url = this._global.url + `/ciudades/bd/` + localStorage.getItem('db');
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      console.log(header)
      let options = new RequestOptions({ headers: header });
      return this._http.get(url, options).map(response =>{
          return response.json();
      })
   }

 updateCities(content: object){
  console.log(content)
  const url = this._global.url + `/ciudades/` + content['id'];
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header });
  return this._http.put(url, content, options).map(response => response.json());
 }

 deleteCities(code: string){
  const url = this._global.url + `/ciudades/` + code;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')  } });
  return this._http.delete(url, options).map(response => response.json());
 }

 createCities(content: object){
   console.log(content)
  const url = this._global.url + `/ciudades`;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: content });
  return this._http.post(url, content, options).map(response => response.json());
 }

}
