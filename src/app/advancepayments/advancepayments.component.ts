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
  payments: any[] = []; paymentEdit: any;

  constructor(private _paymentservice: PaymentsService) { }

  ngOnInit() {
    this._paymentservice.getAdvancePayment().subscribe(data => {
      console.log(data)
      this.payments = data.pagos_anticipados;
    });
    jQuery('select').material_select();
    jQuery('#modal-see').modal();
  }

  openModal (payment) {
    this.paymentEdit = payment;
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
