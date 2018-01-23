import { Component, OnInit } from '@angular/core';

declare let jQuery: any;

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
     
    /*jQuery('#modal-edit').modal();
    jQuery('#modal-see').modal();*/
  }

}
