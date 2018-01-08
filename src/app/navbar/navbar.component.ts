import { Component, OnInit } from '@angular/core';

declare let jQuery: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery(".button-collapse").sideNav();
  }

}
