import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { PaymentsService } from "../services/payment.service";
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
  payments: any[] = []; paymentEdit: any;

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

  constructor(private _paymentservice: PaymentsService) { }

  ngOnInit() {
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

  openModal (payment) {
    this.paymentEdit = Object.assign({}, payment);
    jQuery('#modal-see').modal('open');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(payment){
    this.paymentEdit = payment;
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
        if (this.paymentEdit) {
          this._paymentservice.deleteAdPayment(this.paymentEdit.id).subscribe(
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
