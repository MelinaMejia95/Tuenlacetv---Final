import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from '../services/bills.service';
import swal from 'sweetalert2';
import { Bills } from './bills';

declare let jQuery:any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills: any[] = [];
  toogleDelete:boolean = false;
  billsEdit:any
  nombre: string;

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Bills[]} 
   */
  count: Bills[];

  /**
   * @type {Bills} 
   */

  filter: Bills = new Bills();

  /**
   * @type {number} 
   */
  numberOfBills: number;

  /**
   * @type {number} 
   */
  limit: number;

  constructor(private _billservice: BillService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required],   
    });

  }

  ngOnInit() {
    this._billservice.getBills().subscribe(data => {
      this.bills = data.tipo_facturacion;
    });
    this._billservice.getBillsFilter().subscribe(
      (count: Bills[]) => {
        this.count = count;
        this.numberOfBills = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
        jQuery('#codigoEdit').prop('disabled',true);
        jQuery('#nombreEdit').prop('disabled',true);
        jQuery('#selectEdit').prop('disabled',true);
       }}); 
  }

  selectData(bill){
    this.billsEdit = bill;
  }

  openModal (bill) {
    jQuery('#modal-see').modal('open');
    this.billsEdit = bill;
    console.log(this.billsEdit)
    //document.getElementsByClassName('table-radio');
  }

  createBill(post){
    this.nombre = post.nombre;
    if (post) {
      this._billservice.createBills({ 'nombre': this.nombre, 'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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
 
  updateBill(){
    if(this.billsEdit){
      this._billservice.updateBills({ 'id': this.billsEdit.id,'nombre': this.billsEdit.nombre, 'usuario_id': localStorage.getItem('usuario_id'),
                                            'db': localStorage.getItem('db') }).subscribe(
        data => {
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
        }
      );
    }
  }

  deleteBill(){
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
        if (this.billsEdit) {
          this._billservice.deleteBills(this.billsEdit.id).subscribe(
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
    jQuery('#nombreEdit').prop('disabled',false);
    jQuery('#selectEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nombreEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
  }

}
