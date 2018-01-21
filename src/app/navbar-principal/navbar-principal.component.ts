import { Component, OnInit } from '@angular/core';

declare let jQuery: any;

@Component({
  selector: 'app-navbar-principal',
  templateUrl: './navbar-principal.component.html',
  styleUrls: ['./navbar-principal.component.css']
})
export class NavbarPrincipalComponent implements OnInit { 

  ban:number = 0;

  constructor() {
  }
 
  ngOnInit() {
    jQuery('.modal').modal({
      startingTop: '2%',
      opacity: 0,
    });
  }

  toggleShow() {
    if (this.ban == 0) {
      console.log('hola');
      document.querySelector('#slide-out').classList.toggle('show');
      document.getElementById("slide-out").style.width = "15em";
      document.getElementById('main').style.marginLeft = "16em";
      this.ban = 1;
    } else if (this.ban == 1) {
      console.log('bye');
      document.getElementById("slide-out").style.width = "0";
      document.getElementById("slide-out").style.marginRight = "0";
      document.getElementById('main').style.marginLeft = "0";
      this.ban = 0;
    }
  }

  closeModal() {
    jQuery('#modal1').modal('close');
  }

}
