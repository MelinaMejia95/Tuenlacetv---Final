import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';

@Injectable()
export class BanksService {

  constructor(private _http:Http, private _global: AppGlobals) {
    console.log('working')
   }

  getBanks(){
    const url = this._global.url + `/bancos/bd/` + localStorage.getItem('db');
    let header = new Headers();
    header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
    console.log(header)
    let options = new RequestOptions({ headers: header });
    return this._http.get(url, options).map(response =>{
        return response.json();
    })
 }

 updateBanks(content: object){
   //console.log(content)
  const url = this._global.url + `/bancos/` + content['id'];
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header });
  return this._http.put(url, content, options).map(response => response.json());
 }

 deleteBanks(code: string){
  const url = this._global.url + `/bancos/` + code;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')  } });
  return this._http.delete(url, options).map(response => response.json());
 }

 createBanks(content: object){
   console.log(content)
  const url = this._global.url + `/bancos`;
  let header = new Headers();
  header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
  let options = new RequestOptions({ headers: header, body: content });
  return this._http.post(url, content, options).map(response => response.json());
 }

}
