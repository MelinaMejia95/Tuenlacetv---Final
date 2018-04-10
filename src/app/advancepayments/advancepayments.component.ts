import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { PaymentsService } from "../services/payment.service"

declare let jQuery:any;

@Component({
  selector: 'app-advancepayments',
  templateUrl: './advancepayments.component.html',
  styleUrls: ['./advancepayments.component.css']
})
export class AdvancepaymentsComponent implements OnInit {

  toogleDelete:boolean = false;
  payments: any[] = [];

  constructor(private _paymentservice: PaymentsService) { }

  ngOnInit() {
    this._paymentservice.getPayment().subscribe(data => {
      console.log(data)
      /* this.rates = data.tarifas;
      this.zones = data.zonas;
      this.concepts = data.conceptos;
      this.plans = data.planes;
      this.states = data.estados; */
    });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal();
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
    document.getElementsByClassName('table-radio');*/
    jQuery('#modal-see').modal('open');
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

}
