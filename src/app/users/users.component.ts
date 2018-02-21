import { Component, OnInit } from '@angular/core';

declare let jQuery:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  toogleDelete:boolean = false;
  users: any[] = ['Jeni', 'Meli', 'Aleja'];

  constructor() { }

  ngOnInit() {
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#nomusuarioEdit').prop('disabled',true);
      jQuery('#nomapeEdit').prop('disabled',true);
      jQuery('#passwordEdit').prop('disabled',true);
      jQuery('#nivelEdit').prop('disabled',true);
      jQuery('#estadoEdit').prop('disabled',true);
      jQuery('#tipoimpresoraEdit').prop('disabled',true);
     }});
  }

  openModal () {
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
    
  }

  selectAll() {
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var cantidad = document.getElementsByName('group1');
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    
    if (radios[0].checked){
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = true;
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      }
    } else {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = false;
        rows[i].setAttribute("style", "background-color : none");
      }
    }
  }

  selectRow() {
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var cantidad = document.getElementsByName('group1');

    if (this.toogleDelete == true) {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      this.toogleDelete = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        console.log('false');
        this.toogleDelete = true;
        document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  edit () {
    jQuery('#nomusuarioEdit').prop('disabled',false);
    jQuery('#nomapeEdit').prop('disabled',false);
    jQuery('#passwordEdit').prop('disabled',false);
    jQuery('#nivelEdit').prop('disabled',false);
    jQuery('#estadoEdit').prop('disabled',false);
    jQuery('#tipoimpresoraEdit').prop('disabled',false);
    jQuery('#nomusuarioEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nomapeEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#passwordEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nivelEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#estadoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tipoimpresoraEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
  }

}
