import { Component, OnInit } from '@angular/core';
import { RatesService } from '../services/rates.service';
import swal from 'sweetalert2';
import { Rates } from './rates';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';

declare let jQuery:any;

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  toogleDelete:boolean = false;
  rates: any[] = [];
  zones:string;
  concepts:string; 
  plans:string; fecha: string; states:string; createZone: string; createConcept: string; createPlan: string; createState: string;
  zoneEdit: any; conceptEdit: any; planEdit: any; stateEdit: any; rateEdit: any; fechaEdit: any; zona: any; concepto: any; plan: any; estado: any; picker: any;
  fechainicio: any; fechaven: any; splitted: any; splitted2: any; model1: any; model2: any; model3: any; model4: any; disabled: boolean = true

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  /**
   * @type {Rates[]} 
   */
  count: Rates[];

  /**
   * @type {Rates} 
   */

  filter: Rates = new Rates();

  /**
   * @type {number} 
   */
  numberOfRates: number;

  /**
   * @type {number} 
   */
  limit: number;

  constructor(private _rateservice: RatesService) { }

  ngOnInit() {
    this._rateservice.getRates().subscribe(data => {
      console.log(data)
      this.rates = data.tarifas;
      this.zones = data.zonas;
      this.concepts = data.conceptos;
      this.plans = data.planes;
      this.states = data.estados;
    });
    this._rateservice.getRatesFilter().subscribe(
      (count: Rates[]) => {
        this.count = count;
        this.numberOfRates = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#zonaEdit').prop('disabled',true);
      jQuery('#conceptoEdit').prop('disabled',true);
      jQuery('#planEdit').prop('disabled',true);
      jQuery('#valorEdit').prop('disabled',true);
      jQuery('#estadoEdit').prop('disabled',true);
      jQuery('#fechainicioEdit').prop('disabled',true);
      jQuery('#fechafinEdit').prop('disabled',true);
     }});
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
    });
  }

  openModal (rate) {
    this.disabled = true;
    this.rateEdit = rate;
    console.log(rate)
    let str = this.rateEdit.fechainicio;
    let str2 = this.rateEdit.fechaven;
    this.splitted = str.split("/", 3); this. splitted2 = str2.split("/", 3);
    console.log(this.splitted)
    console.log(this.splitted2)
    for (let i = 0; i < 10; i++) {
      if (this.splitted[0] == "0" + i.toString()) {
        this.splitted[0] = i.toString();
      }
      if (this.splitted2[0] == "0" + i.toString()) {
        this.splitted2[0] = i.toString();
      }
      if (this.splitted[1] == "0" + i.toString()) {
        this.splitted[1] = i.toString();
      }
      if ( this.splitted2[1] == "0" + i.toString() ) {
        this.splitted2[1] = i.toString();
      }
    }
    this.model1 = { date: { year: this.splitted[2], month: this.splitted[1], day: this.splitted[0] } };
    this.model2 = { date: { year: this.splitted2[2], month: this.splitted2[1], day: this.splitted2[0] } };
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
    //this.rateEdit['fechas']= this.rateEdit.fechas;
    //this.picker = jQuery('.datepicker').pickadate();
    //console.log(this.picker)
    //this.picker.set('select', this.rateEdit['fechas'][0].fechainicio , { format: 'yyyy-mm-dd' })
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(rate){
    this.rateEdit = rate;
  }

  createRate(codigo, valor){
    if (valor) {
      this._rateservice.createRates({ 'codigo': codigo, 'valor': valor, 'fechainicio': this.model3, 'fechaven': this.model4, 
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
    }
  } 

  onDateChanged(event: IMyDateModel) {
    console.log(event.formatted )
    this.model3 = event.formatted ;
  }

  onDateChangedServ(event: IMyDateModel) {
    console.log(event.formatted )
    this.model4 = event.formatted ;
  }

  updateRate() {
    if(this.rateEdit){
      this._rateservice.updateRates({ 'id': this.rateEdit.id, 'zona_id': this.zona, 'concepto_id': this.concepto, 'plan_id': this.plan, 'valor': this.rateEdit.valor,
                                    'fechainicio': this.model1.formatted, 'fechaven': this.model2.formatted,
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
    }
  }

  deleteRate(){
    swal({
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
    })
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
    this.disabled = false;
    jQuery('#codigoEdit').prop('disabled',false);
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
    });
  }


}
