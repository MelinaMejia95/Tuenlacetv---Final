import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

declare let jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  conect: any = [];
  bd:string;

  constructor(private _LoginService: LoginService, private route: Router) { }

  ngOnInit() {
    jQuery('select').material_select(); 
    jQuery('#select-bd').on('change', () => {
      this.bd = jQuery('#select-bd').val();
      console.log(this.bd);
    });
  }

  loginUser(user, password){
    if (user && password) {
      this.conect = {'login': user, 'password': password};
      this._LoginService.login(this.conect).subscribe(data =>{
        console.log(data)
        localStorage.setItem('usuario_id', data.usuario_id);
        localStorage.setItem('auth_token', data.auth_token);
        localStorage.setItem('db', this.bd);
        if (data.auth_token) {
          this.route.navigate(['/suscriptor']);
        } 
      });
    }
  }

} 
