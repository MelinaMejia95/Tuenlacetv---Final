import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobals } from '../shared/app.global';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Bills } from '../bills/bills'

@Injectable()
export class BillService {

    constructor(private _http:Http, private _global: AppGlobals) {
        console.log('working')
    }

    getBills(){
        const url = this._global.url + `/tipo_facturacion/bd/` + localStorage.getItem('db');
        let header = new Headers();
        header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
        console.log(header)
        let options = new RequestOptions({ headers: header });
        return this._http.get(url, options).map(response =>{
            return response.json();
        })
     }

     /**
    @return {Observable<Bills[]>} 
   */

    getBillsFilter(): Observable<Bills[]> {
        const url = this._global.url + `/tipo_facturacion/bd/` + localStorage.getItem('db');
        let header = new Headers();
        header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
        console.log(header)
        let options = new RequestOptions({ headers: header });
        return this._http.get(url, options).map(response =>{
            return response.json();
        })
    }
    
     updateBills(content: object){
      const url = this._global.url + `/tipo_facturacion/` + content['id'];
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      let options = new RequestOptions({ headers: header });
      return this._http.put(url, content, options).map(response => response.json());
     }
    
     deleteBills(code: string){
      const url = this._global.url + `/tipo_facturacion/` + code;
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      let options = new RequestOptions({ headers: header, body: { "db": localStorage.getItem('db')  } });
      return this._http.delete(url, options).map(response => response.json());
     }
    
     createBills(content: object){
       console.log(content)
      const url = this._global.url + `/tipo_facturacion`;
      let header = new Headers();
      header.append('Authorization', 'Bearer ' +  localStorage.getItem('auth_token'));
      let options = new RequestOptions({ headers: header, body: content });
      return this._http.post(url, content, options).map(response => response.json());
     }
    

}
