import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

declare let jQuery:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  toogleDelete:boolean = false;
  payments: any[] = ['1', '2', '3'];

  constructor() { }

  ngOnInit() {
    /*this._rateservice.getRates().subscribe(data => {
      console.log(data)
      this.rates = data.tarifas;
      this.zones = data.zonas;
      this.concepts = data.conceptos;
      this.plans = data.planes;
      this.states = data.estados;
    });
    jQuery('select').material_select();*/
    jQuery('#modal-crear').modal();
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
      format: 'yyyy-mm-dd'
    });
    /*jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#zonaEdit').prop('disabled',true);
      jQuery('#conceptoEdit').prop('disabled',true);
      jQuery('#planEdit').prop('disabled',true);
      jQuery('#valorEdit').prop('disabled',true);
      jQuery('#estadoEdit').prop('disabled',true);
      jQuery('#fechainicioEdit').prop('disabled',true);
      jQuery('#fechafinEdit').prop('disabled',true);
     }});
    jQuery('#select-zone').on('change', () => {
      this.createZone = jQuery('#select-zone').val();
    });
    jQuery('#select-concept').on('change', () => {
      this.createConcept = jQuery('#select-concept').val();
    });
    jQuery('#select-plan').on('change', () => {
      this.createPlan = jQuery('#select-plan').val();
    });
    jQuery('#select-state').on('change', () => {
      this.createState = jQuery('#select-state').val();
    });*/
  }

  openModal (rate) {
    /*this.rateEdit = rate;
    console.log(rate)
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
      format: 'yyyy-mm-dd'
    });
    for (let i = 0; i < this.zones.length; i++) {
      if ( rate.zona == this.zones[i]['nombre']) {
        this.zoneEdit = this.zones[i]['nombre'];
        console.log(this.zoneEdit)
      }
    }
    for (let i = 0; i < this.concepts.length; i++) {
      if ( rate.concepto == this.concepts[i]['nombre']) {
        this.conceptEdit = this.concepts[i]['nombre'];
        console.log(this.conceptEdit)
      }
    }
    for (let i = 0; i < this.plans.length; i++) {
      if ( rate.plan == this.plans[i]['nombre']) {
        this.planEdit = this.plans[i]['nombre'];
        console.log(this.planEdit)
      }
    }
    for (let i = 0; i < this.states.length; i++) {
      if ( rate.estado == this.states[i]['nombre']) {
        this.stateEdit = this.states[i]['nombre'];
        console.log(this.stateEdit)
      }
    }
    this.rateEdit['fechas']= this.rateEdit.fechas;
    //this.picker = jQuery('.datepicker').pickadate();
    //console.log(this.picker)
    //this.picker.set('select', this.rateEdit['fechas'][0].fechainicio , { format: 'yyyy-mm-dd' })
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');*/
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(rate){
    //this.rateEdit = rate;
  }

  createRate(codigo, valor, fechaini, fechaven){
    /*if (valor) {
      this._rateservice.createRates({ 'codigo': codigo, 'valor': valor, 'fechainicio': fechaini, 'fechaven': fechaven, 
                                      'zona_id': this.createZone, 'concepto_id': this.createConcept, 'plan_id': this.createPlan, 'estado_id': this.createState,
                                      'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          if ( data.status == "created") {
            swal({
              title: 'Registro creado con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else {
            swal(
              'No se pudo crear el registro',
              '',
              'warning'
            )
          }
        });
    }*/
  } 

  updateRate() {
    /*if(this.rateEdit){
      this._rateservice.updateRates({ 'id': this.rateEdit.id, 'zona_id': this.zona, 'concepto_id': this.concepto, 'plan_id': this.plan, 'valor': this.rateEdit.valor,
                                    'fechainicio': this.fechainicio, 'fechaven': this.fechaven,
                                    'estado_id': this.estado, 'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          console.log(data)
          if ( data.status == "updated") {
            swal({
              title: 'Registro actualizado con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else {
            swal(
              'No se pudo eactualizar el registro',
              '',
              'warning'
            )
          }
        },
        error => {
          swal(
            'No se pudo actualizar el registro',
            '',
            'warning'
          )
        }
      );
    }*/
  }

  deleteRate(){
    /*swal({
      title: '¿Desea eliminar el registro?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.rateEdit) {
          this._rateservice.deleteRates(this.rateEdit.id).subscribe(
            data => {
              if ( data.status == "deleted") {
                swal({
                  title: 'Registro eliminado con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              } else {
                swal(
                  'No se pudo eliminar el registro',
                  '',
                  'warning'
                )
              }
            });
        } 
      }
    })*/
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
    /*jQuery('#codigoEdit').prop('disabled',false);
    jQuery('#zonaEdit').prop('disabled',false);
    jQuery('#conceptoEdit').prop('disabled',false);
    jQuery('#planEdit').prop('disabled',false);
    jQuery('#valorEdit').prop('disabled',false);
    jQuery('#estadoEdit').prop('disabled',false);
    jQuery('#fechainicioEdit').prop('disabled',false);
    jQuery('#fechafinEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#zonaEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#conceptoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#planEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#valorEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#estadoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#fechainicioEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#fechafinEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#zonaEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#conceptoEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#planEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#estadoEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#zonaEdit').on('change', () => {
      this.zona = jQuery('#zonaEdit').val();
    });
    jQuery('#conceptoEdit').on('change', () => {
      this.concepto = jQuery('#conceptoEdit').val();
    });
    jQuery('#planEdit').on('change', () => {
      this.plan = jQuery('#planEdit').val();
    });
    jQuery('#estadoEdit').on('change', () => {
      this.estado = jQuery('#estadoEdit').val();
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
      format: 'yyyy-mm-dd'
    });
    jQuery('#fechainicioEdit').on('change', () =>{
      this.fechainicio = jQuery('#fechainicioEdit').val();
      console.log(this.fechainicio)
    });
    jQuery('#fechafinEdit').on('change', () =>{
      this.fechaven = jQuery('#fechafinEdit').val();
      console.log(this.fechaven)
    });*/
  }


}
