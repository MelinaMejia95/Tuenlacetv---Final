import { Component, OnInit } from '@angular/core';

declare let jQuery:any; 

@Component({
  selector: 'app-suscriptor',
  templateUrl: './suscriptor.component.html',
  styleUrls: ['./suscriptor.component.css']
})
export class SuscriptorComponent implements OnInit {

  toogleDelete:boolean = false;
  tipoUsuario:string;
  suscriptors: any[] = ['Jeni', 'Meli', 'Aleja'];

  constructor() { }

  ngOnInit() {
    document.getElementById('collapsible-television').setAttribute('style', 'visibility: hidden');
    document.getElementById('collapsible-internet').setAttribute('style', 'visibility: hidden');
    jQuery('#modal-crear').modal();
    jQuery('ul.tabs').tabs();
    jQuery('select').material_select();
    jQuery('.dropdown-button').dropdown();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#funcionEdit').prop('disabled',true);
      jQuery('#tipodocEdit').prop('disabled',true);
      jQuery('#documentopersonaEdit').prop('disabled',true);
      jQuery('#nombre1Edit').prop('disabled',true);
      jQuery('#nombre2Edit').prop('disabled',true);
      jQuery('#apellido1Edit').prop('disabled',true);
      jQuery('#apellido2Edit').prop('disabled',true);
      jQuery('#tel1Edit').prop('disabled',true);
      jQuery('#tel2Edit').prop('disabled',true);
      jQuery('#direccionpersonaEdit').prop('disabled',true);
      jQuery('#barrioEdit').prop('disabled',true);
      jQuery('#zonaEdit').prop('disabled',true);
      jQuery('#ciudadEdit').prop('disabled',true);
      jQuery('#correoEdit').prop('disabled',true);
      jQuery('#fechanacimientoEdit').prop('disabled',true);
      jQuery('#tipopersonaEdit').prop('disabled',true);
      jQuery('#estratoEdit').prop('disabled',true);
      jQuery('#condicionEdit').prop('disabled',true);
      jQuery('#televisionEdit').prop('disabled',true);
      jQuery('#internetEdit').prop('disabled',true);
    }});
    jQuery('#funcion').on('change', () => {
      this.tipoUsuario = jQuery('#funcion').val();
      if ( this.tipoUsuario == '1') {
        jQuery('#ciudad').prop('disabled',true);
      } else if ( this.tipoUsuario != '1') {
        jQuery('#ciudad').prop('disabled',false);
      }
    });
    jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date,
      monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
      weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sáb' ],
      format: 'dd/mm/yyyy'
    });
    jQuery('.collapsible').collapsible();
    jQuery('#television').on('change', () =>{
      var changeTv = <HTMLInputElement><any>document.getElementById('television');
      if(changeTv.checked == true) {
        document.getElementById('collapsible-television').setAttribute('style', 'visibility: visible');
        //jQuery('#collapsible-television').prop('visibility','visible');
      } else {
        //jQuery('#collapsible-television').collapsible('visibility', 'hidden');
        document.getElementById('collapsible-television').setAttribute('style', 'visibility: hidden');
      }
    }); 
    jQuery('#internet').on('change', () =>{
      var changeTv = <HTMLInputElement><any>document.getElementById('internet');
      if(changeTv.checked == true) {
        document.getElementById('collapsible-internet').setAttribute('style', 'visibility: visible');
        //jQuery('#collapsible-internet').collapsible('open', 0);
      } else {
        document.getElementById('collapsible-internet').setAttribute('style', 'visibility: hidden');
        //jQuery('#collapsible-internet').collapsible('close', 0);
      }
    });
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

  edit() {
    jQuery('#funcionEdit').prop('disabled',false);
    jQuery('#tipodocEdit').prop('disabled',false);
    jQuery('#documentopersonaEdit').prop('disabled',false);
    jQuery('#nombre1Edit').prop('disabled',false);
    jQuery('#nombre2Edit').prop('disabled',false);
    jQuery('#apellido1Edit').prop('disabled',false);
    jQuery('#apellido2Edit').prop('disabled',false);
    jQuery('#tel1Edit').prop('disabled',false);
    jQuery('#tel2Edit').prop('disabled',false);
    jQuery('#direccionpersonaEdit').prop('disabled',false);
    jQuery('#barrioEdit').prop('disabled',false);
    jQuery('#zonaEdit').prop('disabled',false);
    jQuery('#ciudadEdit').prop('disabled',false);
    jQuery('#correoEdit').prop('disabled',false);
    jQuery('#fechanacimientoEdit').prop('disabled',false);
    jQuery('#tipopersonaEdit').prop('disabled',false);
    jQuery('#estratoEdit').prop('disabled',false);
    jQuery('#condicionEdit').prop('disabled',false);
    jQuery('#televisionEdit').prop('disabled',false);
    jQuery('#internetEdit').prop('disabled',false);
    /*jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nomusuarioEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nomapeEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#passwordEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nivelEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#estadoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#impresoraEdit').attr({style:' margin: 2px 0 7px 0 !important;'});*/
  }

}
