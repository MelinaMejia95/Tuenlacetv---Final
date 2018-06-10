import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { ExcelService } from '../services/excel.service';
import { PaymentsService } from '../services/payment.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import { Payments } from './payment';

declare let jQuery:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  toogleDelete:boolean = false;
  payments: any[] = []; concepts: any; payoption: any; banks: any; payEdit: any; model1: any; model2: any;
  contador: number = 0;

  printForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Payments[]} 
   */
  count: Payments[];

  /**
   * @type {Payments} 
   */

  filter: Payments = new Payments();

  /**
   * @type {number} 
   */
  numberOfPayments: number;

  /**
   * @type {number} 
   */
  limit: number;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1
  };
  public labels: any = {
      previousLabel: 'Anterior',
      nextLabel: 'Siguiente',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(private _paymentservice: PaymentsService, private excelService: ExcelService, private fb: FormBuilder) {
    
    this.printForm = fb.group({
      'fechainicio': [null, Validators.required],
      'fechafin': [null, Validators.required],       
    })

  }

  ngOnInit() {
    if(jQuery( window ).width() <= 600) {
      document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
     } else {
      document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
     }
    jQuery( window ).resize( function () {
      if(jQuery( window ).width() <= 600) {
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      } else {
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      }
    })
    this._paymentservice.getPayment().subscribe(data => {
      console.log(data)
      this.payments = data.pagos;
      /* this.concepts = data.conceptos;
      this.payoption = data.formas_pago;
      this.banks = data.bancos; */
    });
    this._paymentservice.getPaymentsFilter().subscribe(
      (count: Payments[]) => {
        this.count = count;
        this.numberOfPayments = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('#modal-imprimir').modal();    
    jQuery('#modal-see').modal();
    jQuery('#registros').on('change', () => {
      this.config.itemsPerPage = Number(jQuery('#registros').val()); 
      console.log(jQuery('#registros').val());
      if (jQuery('#registros').val() == '10') {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      } else {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      }
    })
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  changeEntity(){
    localStorage.setItem('entidad', '1');
  }

  resetForms() {
    this.printForm.reset();
  }

  openModal (payment) {
    this.payEdit = payment;
    /* for (let i = 0; i < this.zones.length; i++) {
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
    } */
    document.getElementsByClassName('table-radio');
    jQuery('#modal-see').modal('open');
  }

  deletePayment() {
    swal({
      title: '¿Desea anular el pago?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.payEdit) {
          this._paymentservice.deletePayment(this.payEdit.id).subscribe(
            data => {
              console.log(data)
              if ( data.status == "anulado") {
                swal({
                  title: 'Pago anulado con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              } else if ( data.error == "error al anular pago") {
                swal(
                  'No se pudo anular el pago',
                  '',
                  'warning'
                )
              } else if ( data.error == "Entidad no aceptable o error de clave foranea" ) {
                swal(
                  'No se pudo anular el registro ya que tiene relación con otro módulo del sistema',
                  '',
                  'warning'
                )
              }
            },
          error =>{
            swal(
              'No se pudo anular el pago',
              '',
              'warning'
            )
          })
        } 
      }
    })
  }

  onDatePrint(event) {
    this.model1 = event.formatted ;
  }

  onDatePrint2(event) {
    this.model2 = event.formatted ;
  }

  exportToExcel(post){
  this._paymentservice.downloadPayments({'fechaini': this.model1, 'fechafin': this.model2, "db": localStorage.getItem('db') }).subscribe(data => {
    console.log(data)  
    this.excelService.exportAsExcelFile(data.detalle_recibos, 'Pagos', 6);
    });
    this.printForm.reset();
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(payment){
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var cantidad = document.getElementsByName('group1');
    let splitted;
    this.contador = 0;
    for(var i = 0; i < cantidad.length; i++){
      if(check[i].checked){
        splitted = check[i].id.split('_',2);
        this.contador++;
      }
    }
    for(var j = 0; j < this.payments.length; j++) {
      if(this.contador == 1 && Number(splitted[1]) == this.payments[j]['id']){
        this.payEdit = this.payments[j]
      }
    }
    console.log(this.payEdit) 
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
