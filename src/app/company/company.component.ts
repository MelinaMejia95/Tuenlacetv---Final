import { Component, OnInit } from '@angular/core';

declare let jQuery:any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  toogleDelete:boolean = false;
  companies: any[] = ['Socia', 'Yuxi', 'Globant'];

  constructor() { }

  ngOnInit() {
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#nitEdit').prop('disabled',true);
      jQuery('#razonEdit').prop('disabled',true);
      jQuery('#direccionEdit').prop('disabled',true);
      jQuery('#tel1Edit').prop('disabled',true);
      jQuery('#tel2Edit').prop('disabled',true);
      jQuery('#ciudadEdit').prop('disabled',true);
      jQuery('#representanteEdit').prop('disabled',true);
      jQuery('#fileEdit').prop('disabled',true);
      jQuery('#logoEdit').prop('disabled',true);
      jQuery('#correoEdit').prop('disabled',true);
      jQuery('#contribuyenteEdit').prop('disabled',true);
      jQuery('#regimenEdit').prop('disabled',true);
      jQuery('#centroEdit').prop('disabled',true);
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
    jQuery('#nitEdit').prop('disabled',false);
    jQuery('#razonEdit').prop('disabled',false);
    jQuery('#direccionEdit').prop('disabled',false);
    jQuery('#tel1Edit').prop('disabled',false);
    jQuery('#tel2Edit').prop('disabled',false);
    jQuery('#ciudadEdit').prop('disabled',false);
    jQuery('#representanteEdit').prop('disabled',false);
    jQuery('#fileEdit').prop('disabled',false);
    jQuery('#logoEdit').prop('disabled',false);
    jQuery('#correoEdit').prop('disabled',false);
    jQuery('#contribuyenteEdit').prop('disabled',false);
    jQuery('#regimenEdit').prop('disabled',false);
    jQuery('#centroEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nitEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#razonEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#direccionEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tel1Edit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tel2Edit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#ciudadEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#representanteEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#fileEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#logoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#correoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#contribuyenteEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#regimenEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#centroEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
  }

}
