import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Countries } from './countries';

declare let jQuery:any;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any[] = [];
  toogleDelete:boolean = false;
  countriesEdit:any; name: string;

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

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  selectData(country){
    this.countriesEdit = country;
  }

  openModal (country) {
    jQuery('#modal-see').modal('open');
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
 