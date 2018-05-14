import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { LoginService } from '../services/login.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

declare let jQuery: any;

@Component({
  selector: 'app-navbar-principal',
  templateUrl: './navbar-principal.component.html',
  styleUrls: ['./navbar-principal.component.css']
})
export class NavbarPrincipalComponent implements OnInit { 

  ban:number = 0;

  passForm: FormGroup;
  titleAlert: string = "Campo requerido";

  constructor(private _loginservice: LoginService, private route: Router, private fb: FormBuilder, private _userservie: UsersService) {

    this.passForm = fb.group({
      'contraseña': [null, Validators.required],
      'nueva': [null, Validators.required],           
    });
  }
 
  ngOnInit() {
    jQuery('.modal').modal({
      startingTop: '2%',
      opacity: 0,
    });

    let sideNavOpen = localStorage.getItem('sideNavOpen');
    this.ban = sideNavOpen == 'true' || sideNavOpen == null ? 0 : 1;
    this.toggleShow();
  }

  toggleShow() {
    if (this.ban == 0) {
      document.querySelector('#slide-out').classList.toggle('show');
      document.getElementById("slide-out").style.width = "15em";
      document.getElementById('main').style.marginLeft = "15em";
      localStorage.setItem('sideNavOpen', 'true');
      this.ban = 1;
    } else if (this.ban == 1) {
      document.getElementById("slide-out").style.width = "0";
      document.getElementById("slide-out").style.marginRight = "0";
      document.getElementById('main').style.marginLeft = "0";
      localStorage.setItem('sideNavOpen', 'false');
      this.ban = 0;
    }
  }

  closeModal() {
    //jQuery('#modal1').modal('close');
    let token = localStorage.getItem('auth_token');
    console.log(token)
    this._loginservice.logout(token).subscribe(data => {
      console.log(data);
      if (data.status == "deleted") {
        this.route.navigate(['/login']);
        localStorage.removeItem('auth_token');
      }
    });
  }

  changePassword(post){
    jQuery('#modal-password').modal('open');
    if(post){
      this._userservie.changePassword({'id': localStorage.getItem('usuario_id'), 'antiguaP': post.contraseña, 'nuevaP': post.nueva,  
                                      'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          console.log(data)
          if ( data.message == "Contraseña actualizada!") {
            swal({
              title: 'Contraseña actualizada con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else  if ( data.message == "Error!") {
            swal(
              'No se pudo actualizar la contraseña',
              '',
              'warning'
            )
          } if ( data.message == "Contraseña antigua incorrecta!") {
            swal(
              'Contraseña antigua incorrecta!',
              '',
              'warning'
            )
          }
        }
      );
    }
    jQuery('#modal1').modal('close');
    this.passForm.reset();
  }

  openModalPass(){
    jQuery('#modal-password').modal('open');
    jQuery('#modal1').modal('close');
  }

  resetForm() {
    this.passForm.reset();
  }

}
