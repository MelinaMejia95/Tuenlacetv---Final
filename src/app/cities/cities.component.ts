import { Component, OnInit } from '@angular/core';

declare let jQuery: any;

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities: any[] = ['Medellín', 'Bogotá', 'Cali']

  constructor() { }

  ngOnInit() {
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal();

    /*var elements = document.getElementsByClassName('clickable');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.addEventListener('click', function () {
        var href = this.dataset.href;
        if (href) {
          window.location.assign(href);
        }
      });
    }*/
     
    /*jQuery('#modal-edit').modal();
    jQuery('#modal-see').modal();*/
  }

  openModal () {
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
    //jQuery('.table-radio').attr('checked');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectAll() {
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var cantidad = document.getElementsByName('group1');
    
    if (radios[0].checked){
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        console.log(check[i]);
        check[i].checked = true;
      }
    } else {
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = false;
      }
    }
  }

}
