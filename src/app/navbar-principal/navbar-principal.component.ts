import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

declare let jQuery: any;

@Component({
  selector: 'app-navbar-principal',
  templateUrl: './navbar-principal.component.html',
  styleUrls: ['./navbar-principal.component.css']
})
export class NavbarPrincipalComponent implements OnInit { 

  ban:number = 0;

  constructor(private _loginservice: LoginService, private route: Router) {
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

  changePassword(){
    jQuery('#modal-password').modal('open');
    jQuery('#modal1').modal('close');
  }

}
