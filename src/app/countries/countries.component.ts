import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import { OnChanges, SimpleChanges, Input } from '@angular/core';
import swal from 'sweetalert2';
import { Countries } from './countries';

declare let jQuery:any;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements  OnInit {

  countries: any[] = [];
  toogleDelete:boolean = false;
  countriesEdit:any; name: string;
  toogleEdit: boolean = false; toogleCheck: boolean = false;
  cont: number = 0; contador: number = 0;
  rForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Countries[]} 
   */
  count: Countries[];

  /**
   * @type {Countries} 
   */

  filter: Countries = new Countries();

  /**
   * @type {number} 
   */
  numberOfCountries: number;

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

  constructor(private _countryservice: CountriesService, private fb: FormBuilder) {
    
    this.rForm = fb.group({
      'nombre': [null, Validators.required],
    });

  }

  ngOnInit() {
    this._countryservice.getCountries().subscribe(data => {
      this.countries = data.paises;
    });
    this._countryservice.getCountriesFilter().subscribe(
      (count: Countries[]) => {
        this.count = count;
        this.numberOfCountries = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
        jQuery('#codigoEdit').prop('disabled',true);
        jQuery('#nombreEdit').prop('disabled',true);
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

  inputClicked() {
    this.toogleEdit = true;
    this.onChanges()
  }

  onChanges(): void { 
    this.rForm.valueChanges.subscribe(val => {  
      if(this.rForm.valid == true && this.toogleEdit == true) {
        console.log('valid')
        jQuery('#btn-edit').prop('disabled', false);
      } else if(this.rForm.valid == false){
        console.log('invalid')      
        jQuery('#btn-edit').prop('disabled', true);
      }
    });
  }

  resetForms() {
    this.rForm.reset();
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  selectData(country){
    /* var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var cantidad = document.getElementsByName('group1');

    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        this.contador++;
        if(check[i].checked && this.contador == 1 && this.toogleCheck == true) { */
        this.countriesEdit = country;
       /*  this.toogleCheck = true;
        }
        console.log(check[i], this.contador)
      } 
    }    
    console.log(this.countriesEdit) */
  }

  openModal (country) {
    jQuery('#modal-see').modal('open');
    this.toogleEdit = false;
    jQuery('input[type=text]').attr({style:' box-shadow: none'});
    this.countriesEdit = Object.assign({}, country);
    console.log(this.countriesEdit)
    //document.getElementsByClassName('table-radio');
  }

  createCountry(post){
    if (post) {
      this.name = post.nombre;
      console.log(post.nombre);
      this._countryservice.createCountries({ 'nombre': this.name, 'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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
          }else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
            swal(
              'No se pudo crear el registro, datos incorrectos',
              '',
              'warning'
            )
          } 
        });
        error =>{
          swal(
            'No se pudo crear el registro',
            '',
            'warning'
          )
        }
    }
  } 
 
  updateCountry(){
    if(this.countriesEdit){
      this._countryservice.updateCountries({ 'id': this.countriesEdit.id,'nombre': this.countriesEdit.nombre, 'usuario_id': localStorage.getItem('usuario_id'),
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
          } else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
            swal(
              'No se pudo actualizar registro, datos incorrectos',
              '',
              'warning'
            )
          }
        },
        error =>{
          swal(
            'No se pudo actualizar el registro',
            '',
            'warning'
          )
        }
      );
    }
  }

  deleteCountry(){
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
        if (this.countriesEdit) {
          this._countryservice.deleteCountries(this.countriesEdit.id).subscribe(
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
              } else if ( data.error == "Entidad no aceptable o error de clave foranea" ) {
                swal(
                  'No se pudo eliminar el registro ya que tiene relación con otro módulo del sistema',
                  '',
                  'warning'
                )
              }
            },
            error =>{
              swal(
                'No se pudo eliminar el registro ya que tiene relación con otro módulo del sistema',
                '',
                'warning'
              )
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
    
    document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');          

    if (radios[0].checked){
      
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = true;
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      }
    } else {
      
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
    var ban = false;
    this.cont = 0;

    if (this.toogleDelete == true) {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      this.toogleDelete = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        this.cont = this.cont +  1;
        this.toogleDelete = true;
        document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
        ban = false
      } else {
        ban = true
        rows[i].setAttribute("style", "background-color : none");
      }
    }    

    if(ban == true) { 
      this.contador = 0;
    }

    if(this.cont > 1) {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');          
    } else if (this.cont <= 1 && this.toogleDelete == true){
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');           
    }

  }

  edit () {
    jQuery('#nombreEdit').prop('disabled',false);
    jQuery('#selectEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nombreEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
  }

}
 