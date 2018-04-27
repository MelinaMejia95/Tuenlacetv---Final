import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanksService } from '../services/banks.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Banks } from './banks';

declare let jQuery:any;

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  banks: any[] = [];
  toogleDelete:boolean = false;
  cities: string; createCity: string; nit: string; nombre: string; direccion: string; tel1: string; tel2: string; contacto: string; cuentacon: string;
  cuentaban: string;
  cityEdit: any; bankEdit: any; bank: any;
  

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Banks[]} 
   */
  count: Banks[];

  /**
   * @type {Banks} 
   */

  filter: Banks = new Banks();

  /**
   * @type {number} 
   */
  numberOfBanks: number;

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

  constructor(private _bankservice: BanksService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nit': [null, Validators.required],
      'nombre': [null, Validators.required],
      'direccion': [null, Validators.required],
      'tel1': [null, Validators.required],
      'ciudad': [null, Validators.required],
      'cuentacon': [null, Validators.required],
      'cuentaban': [null, Validators.required],
      'tel2': [null],
      'contacto': [null],
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required],
      'nit-ver': [null, Validators.required],
      'direccion-ver': [null, Validators.required],
      'tel1-ver': [null, Validators.required],
      'cuentacon-ver': [null, Validators.required],
      'cuentaban-ver': [null, Validators.required],
    });

  }

  ngOnInit() {
    this._bankservice.getBanks().subscribe(data => {
      this.banks = data.bancos;
      this.cities = data.ciudades;
      console.log(this.cities[0]['nombre'])
    });
    this._bankservice.getBanksFilter().subscribe(
      (count: Banks[]) => {
        this.count = count;
        this.numberOfBanks = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#nitEdit').prop('disabled',true);
      jQuery('#direccionEdit').prop('disabled',true);
      jQuery('#tel1Edit').prop('disabled',true);
      jQuery('#tel2Edit').prop('disabled',true);
      jQuery('#ciudadEdit').prop('disabled',true);
      jQuery('#contactoEdit').prop('disabled',true);
      jQuery('#cuenta_banEdit').prop('disabled',true);
      jQuery('#cuenta_conEdit').prop('disabled',true);
      jQuery('#selectEdit').prop('disabled',true);
     }});
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

  
  openModal (bank) {
    for (let i = 0; i < this.cities.length; i++) {
      if ( bank.ciudad == this.cities[i]['nombre']) {
        this.cityEdit = this.cities[i]['nombre'];
        console.log(this.cityEdit)
      }
    }
    this.bankEdit = bank;
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
    //jQuery('.table-radio').attr('checked');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
    
  }

  selectData(bank){
    this.bankEdit = bank;
  }

  createBank(post){
    this.nit = post.nit;
    this.nombre = post.nombre;
    this.direccion = post.direccion;
    this.createCity = post.ciudad;
    this.tel1 = post.tel1;
    this.tel2 = post.tel2;
    this.contacto = post.contacto;
    this.cuentaban = post.cuentaban;
    this.cuentacon = post.cuentacon;
    if (post) {
      this._bankservice.createBanks({ 'nit': this.nit, 'nombre': this.nombre, 'direccion': this.direccion,
                                      'ciudad_id': this.createCity, 'telefono1': this.tel1, 'telefono2': this.tel2, 
                                      'contacto': this.contacto, 'cuentaBancaria': this.cuentaban, 'cuentaContable': this.cuentacon, 
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

  updateBank() {
    if(this.bankEdit){
      this._bankservice.updateBanks({'id': this.bankEdit.id, 'nit': this.bankEdit.nit, 'nombre': this.bankEdit.nombre, 'direccion': this.bankEdit.direccion,
                                    'ciudad_id': this.bank, 'telefono1': this.bankEdit.telefono1, 'telefono2': this.bankEdit.telefono2, 
                                    'contacto': this.bankEdit.contacto, 'cuentaBancaria': this.bankEdit.cuentaBancaria, 'cuentaContable': this.bankEdit.cuentaContable,
                                    'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
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
        }
      );
    }
  }

  deleteBank() {
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
        if (this.bankEdit) {
          this._bankservice.deleteBanks(this.bankEdit.id).subscribe(
            data => {
              console.log(data)
              if ( data.status == "deleted") {
                swal({
                  title: 'Registro eliminado con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              } 
            },
          error =>{
            swal(
              'No se pudo eliminar el registro',
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

  edit () {
    jQuery('#nitEdit').prop('disabled',false);
    jQuery('#direccionEdit').prop('disabled',false);
    jQuery('#tel1Edit').prop('disabled',false);
    jQuery('#tel2Edit').prop('disabled',false);
    jQuery('#ciudadEdit').prop('disabled',false);
    jQuery('#contactoEdit').prop('disabled',false);
    jQuery('#cuenta_banEdit').prop('disabled',false);
    jQuery('#cuenta_conEdit').prop('disabled',false);
    jQuery('#selectEdit').prop('disabled',false);
    jQuery('#nombreEdit').prop('disabled',false);
    /* jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nitEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#direccionEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tel1Edit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tel2Edit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#ciudadEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#contactoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#cuenta_banEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#cuenta_conEdit').attr({style:' margin: 2px 0 7px 0 !important;'}); */
    jQuery('#selectEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#selectEdit').on('change', () => {
      this.bank = jQuery('#selectEdit').val();
      console.log(this.bank)
    });
  }

}
