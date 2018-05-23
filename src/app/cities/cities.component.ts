import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from '../services/cities.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Cities } from './cities';

declare let jQuery: any;

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities: any[] = []; depSelect: any[] = [];
  selected: number;
  toogleDelete:boolean = false;
  citiesEdit:any; department:any; depEdit:any; countryEdit: any; country:any;
  createCountry:string; createDep:string; countries:string; departments:string; name: string; coddane: string; codalt: string;
  toogleEdit: boolean = false;

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Cities[]} 
   */
  count: Cities[];

  /**
   * @type {Cities} 
   */

  filter: Cities = new Cities();

  /**
   * @type {number} 
   */
  numberOfCities: number;

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

  constructor(private _cityservice: CitiesService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'pais': [null, Validators.required],
      'depart': [null, Validators.required],
      'coddane': [null],
      'codalt': [null]
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required],
      'coddane': [null],
      'codalt': [null]
    });

  }

  ngOnInit() {
    this._cityservice.getCities().subscribe(data => {
      this.cities = data.ciudades;
      this.countries = data.paises;
      this.departments = data.departamentos;
      console.log(data)
    });
    this._cityservice.getCitiesFilter().subscribe(
      (count: Cities[]) => {
        this.count = count;
        this.numberOfCities = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
    });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
        jQuery('#codigoEdit').prop('disabled',true);
        jQuery('#nombreEdit').prop('disabled',true);
        jQuery('#selectEdit').prop('disabled',true);
        jQuery('#selectDep').prop('disabled',true);
        jQuery('#coddaneEdit').prop('disabled',true);
        jQuery('#codalternoEdit').prop('disabled',true);
        this.toogleEdit = false;    
        jQuery('#btn-edit').prop('disabled', true);            
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
    console.log('input clicked')
    this.toogleEdit = true;
    this.onChanges()
  }

  selectClicked(){
    jQuery('#btn-edit').prop('disabled', false);    
  }

  onChanges(): void { 
    this.seeForm.valueChanges.subscribe(val => {  
      if(this.seeForm.valid == true && this.toogleEdit == true) {
        jQuery('#btn-edit').prop('disabled', false);
      } else if(this.seeForm.valid == false){    
        jQuery('#btn-edit').prop('disabled', true);
      }
    });
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  llenarDep(val) {
    let j = 0;
    for (let i=0; i < this.departments.length ; i++) {
      if (val == this.departments[i]['pais_id']) {
        this.depSelect[j] =  this.departments[i];
        j++;
      }
    }
    console.log(this.depSelect)
  }

  resetForms() {
    this.rForm.reset();
    this.seeForm.reset();
  }

  selectData(city){
    this.citiesEdit = city;
    console.log(this.citiesEdit.id)
  }

  createCity(post){
    this.createCountry = post.pais;
    this.name = post.nombre;
    this.createDep = post.depart;
    this.coddane = post.coddane;
    this.codalt = post.codalt;
    if (post) {
      this._cityservice.createCities({ 'pais_id': this.createCountry, 'nombre': this.name, 'departamento_id': this.createDep,
      'codigoAlterno': this.codalt, 'codigoDane': this.coddane, 'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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
          } else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
            swal(
              'No se pudo crear registro, datos incorrectos',
              '',
              'warning'
            )
          }
        },
        error =>{
          swal(
            'No se pudo crear el registro',
            '',
            'warning'
          )
        });
    }
  } 

  updateCity(){
    if(this.citiesEdit){
      this._cityservice.updateCities({'pais_id': this.country, 'nombre': this.citiesEdit.nombre, 'id': this.citiesEdit.id, 'codigoDane': this.citiesEdit.codigoDane, 
      'codigoAlterno': this.citiesEdit.codigoAlterno, 'usuario_id': localStorage.getItem('usuario_id'),
                                    'db': localStorage.getItem('db')}).subscribe(
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
        });
    }
  }

  deleteCity() {
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
        if (this.citiesEdit) {
          console.log(this.citiesEdit.id)
          this._cityservice.deleteCities(this.citiesEdit.id).subscribe(
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
              } else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
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
          })
        } 
      }
    })
  }

  openModal (city) {
    this.toogleEdit = false;    
    for (let i = 0; i < this.countries.length; i++) {
      if ( city.pais == this.countries[i]['nombre']) {
        this.countryEdit = this.countries[i]['nombre'];
      }
    }
    for (let i = 0; i < this.departments.length; i++) {
      if ( city.departamento == this.departments[i]['nombre']) {
        this.depEdit = this.departments[i]['nombre'];
      }
    }
    jQuery('#modal-see').modal('open');
    jQuery('input[type=text]').attr({style:' box-shadow: none'});        
    this.citiesEdit = Object.assign({}, city);
    document.getElementsByClassName('table-radio');
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
    jQuery('#selectDep').prop('disabled',false);
    jQuery('#coddaneEdit').prop('disabled',false);
    jQuery('#codalternoEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#coddaneEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nombreEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#codalternoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#selectEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#selectDep').children('option[value="nodisplay"]').css('display','none');
    jQuery('#selectEdit').on('change', () => {
      this.country = jQuery('#selectEdit').val();
      console.log(this.country)
    });
    jQuery('#selectDep').on('change', () => {
      this.department = jQuery('#selectDep').val();
      console.log(this.department)
    });
  }

}
