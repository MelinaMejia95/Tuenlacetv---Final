import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AppGlobals } from '../shared/app.global';
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

  rForm: FormGroup;
  titleAlert: string = "Campo requerido";

  constructor(private _LoginService: LoginService, private route: Router, private _global: AppGlobals, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'contraseña': [null, Validators.required],
      'bd': [null],
    });

  }

  ngOnInit() {
    jQuery('select').material_select(); 
    jQuery('#select-bd').on('change', () => {
      this.bd = jQuery('#select-bd').val();
      console.log(this.bd);
      if(this.rForm.valid == true) {
        jQuery('#conectar').prop('disabled', false)
      } else {
        jQuery('#conectar').prop('disabled', true)      
        console.log('false')  
      }
    });
    jQuery('#ref-navbar').hide();
    jQuery('#ref-footer').hide();
    document.getElementById('main').style.marginLeft = "0";
  }

  changeBD(val) {
    console.log(val)
  }
  
  loginUser(post){
    console.log(post.bd)
    if (post) {
      this.conect = {'login': post.nombre, 'password': post.contraseña};
      this._LoginService.login(this.conect).subscribe(data =>{
        console.log(data)
        localStorage.setItem('usuario_id', data.usuario_id);
        localStorage.setItem('auth_token', data.auth_token);
        localStorage.setItem('nivel', data.nivel);
        localStorage.setItem('db', this.bd);
        localStorage.setItem('entidad', '1');
        this._global.entity = 'Suscriptor';
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
