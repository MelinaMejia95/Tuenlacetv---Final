import { Component, OnInit } from '@angular/core';

declare let jQuery; 

@Component({
  selector: 'app-suscriptor',
  templateUrl: './suscriptor.component.html',
  styleUrls: ['./suscriptor.component.css']
})
export class SuscriptorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery('#modal-crear').modal();
    jQuery('ul.tabs').tabs();
    jQuery('select').material_select();
  }

}
