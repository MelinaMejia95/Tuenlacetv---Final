import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

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
    jQuery('#ref-navbar').hide();
    jQuery('#ref-footer').hide();
    document.getElementById('main').style.marginLeft = "0";
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
          jQuery('#ref-navbar').show();
          jQuery('#ref-footer').show();
          if (localStorage.getItem('sideNavOpen') == 'true')
            document.getElementById('main').style.marginLeft = "15em";
          else
            document.getElementById('main').style.marginLeft = "0";
          this.route.navigate(['/subscriber']);
        } 
      },
      error => {
        swal(
          'Error con tu nombre de usuario y/o contraseña',
          '',
          'warning'
        )
        
      });
    }
  }

} 
