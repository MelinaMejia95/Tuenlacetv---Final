import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { PaymentsService } from "../services/payment.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ExcelService } from '../services/excel.service';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import { AdPayments } from './adpayment';

declare let jQuery:any;

@Component({
  selector: 'app-advancepayments',
  templateUrl: './advancepayments.component.html',
  styleUrls: ['./advancepayments.component.css']
})
export class AdvancepaymentsComponent implements OnInit {

  toogleDelete:boolean = false;
  payments: any[] = []; paymentEdit: any; result: number; model1: any; model2: any;
  contador: number = 0;
  nivel: string;

  printForm: FormGroup;
  titleAlert: string = "Campo requerido";

   /**
   * @type {AdPayments[]} 
   */
  count: AdPayments[];

  /**
   * @type {AdPayments} 
   */

  filter: AdPayments = new AdPayments();

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

  public loading = false;

  constructor(private _paymentservice: PaymentsService, private excelService: ExcelService, private fb: FormBuilder) {

    this.printForm = fb.group({
      'fechainicio': [null, Validators.required],
      'fechafin': [null, Validators.required],       
    })

   }

  ngOnInit() {          
    this.nivel = localStorage.getItem('nivel');
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
    this._paymentservice.getAdvancePayment().subscribe(data => {
      console.log(data)
      this.payments = data.pagos_anticipados;
    });
    this._paymentservice.getAdPaymentsFilter().subscribe(
      (count: AdPayments[]) => {
        this.count = count;
        this.numberOfPayments = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('select').material_select();
    jQuery('#modal-see').modal();
    jQuery('#registros').children('option[value="nodisplay"]').css('display','none');
    jQuery('#modal-imprimir').modal();   
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

  ngOnDestroy () {
    document.querySelector('.principal-container').classList.remove('modal-flow');    
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  changeEntity(){
    localStorage.setItem('entidad', '1');
  }

  openModal (payment) {
    console.log(payment)
    this.paymentEdit = Object.assign({}, payment);
    jQuery('#modal-see').modal('open');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  onDatePrint(event) {
    this.model1 = event.formatted ;
  }

  onDatePrint2(event) {
    this.model2 = event.formatted ;
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
        this.paymentEdit = this.payments[j]
      }
    }
    console.log(this.paymentEdit) 
  }

  exportToExcel(post){
    this._paymentservice.downloadPayments({'fechaini': this.model1, 'fechafin': this.model2, "db": localStorage.getItem('db') }).subscribe(data => {
      console.log(data)  
      this.excelService.exportAsExcelFile(data.detalle_recibos, 'Pagos', 6);
      });
      this.printForm.reset();
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
        this.loading = true;
          this._paymentservice.deleteAdPayment(this.paymentEdit.id).subscribe(
            data => {
              this.loading = false;              
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
                this.result = 1;
              } else if ( data.error == "error al anular pago") {
                swal(
                  'No se pudo anular el pago',
                  '',
                  'warning'
                )
                this.result = 2;
              } else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
                swal(
                  'No se pudo anular el pago anticipado ya que está asociado a una factura',
                  '',
                  'warning'
                )
              }
            },
          error =>{
            this.loading = false;                          
            swal(
              'No se pudo anular el pago',
              '',
              'warning'
            )
            this.result = 4
          })
      }
    })
    //this.result = 1;
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
