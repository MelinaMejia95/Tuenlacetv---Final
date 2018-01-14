import { Component, OnInit } from '@angular/core';

declare let jQuery: any;

@Component({
  selector: 'app-navbar-principal',
  templateUrl: './navbar-principal.component.html',
  styleUrls: ['./navbar-principal.component.css']
})
export class NavbarPrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  toggleShow() {
    document.querySelector('#slide-out').classList.toggle('show');
  }

}
