import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from '../services/departments.service';
import { OnChanges, SimpleChanges, Input } from '@angular/core';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Departaments } from './dep';

declare let jQuery: any;

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: any[] = [];
  selected: number; cont: number = 0;
  toogleDelete:boolean = false;
  countries:string; countryEdit: string; nameCountry: string; codCountry: string;
  depEdit:any; country: any; createCountry: any;
  toogleEdit: boolean = false; toogleCheck: boolean = false;

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Departaments[]} 
   */
  count: Departaments[];

  /**
   * @type {Departaments} 
   */

  filter: Departaments = new Departaments();

  /**
   * @type {number} 
   */
  numberOfDepartaments: number;

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

  constructor(private _departmentservice: DepartmentsService, private fb: FormBuilder) {

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'pais': [null, Validators.required],
      'codpais': [null],
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required],
      'pais': [null],
      'codpais': [null]
    });

  }

  ngOnInit() {
    jQuery( window ).resize( function () {
      if(jQuery( window ).width() <= 600) {
        console.log('entro')
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      } else {
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      }
      console.log(jQuery( window ).width());
    })
    this._departmentservice.getDepartments().subscribe(data => {
      this.departments = data.departamentos;
      this.countries = data.paises;
      console.log(this.departments)
    });
    this._departmentservice.getDepartamentsFilter().subscribe(
      (count: Departaments[]) => {
        this.count = count;
        this.numberOfDepartaments = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
    });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
        jQuery('#nombreEdit').prop('disabled',true);
        jQuery('#selectPais').prop('disabled',true);
        jQuery('#codpaisEdit').prop('disabled',true);
        this.toogleEdit = false;    
        jQuery('#btn-edit').prop('disabled', true);  
        //this.seeForm.reset();
       }});
/*     jQuery('#select-country').on('change', () => {
      this.createCountry = jQuery('#select-country').val();
    }); */
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

  selectClicked(){
    jQuery('#btn-edit').prop('disabled', false);    
  }

  inputClicked() {
    console.log('input clicked')
    this.toogleEdit = true;
    this.onChanges()
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

  resetForms() {
    this.rForm.reset();
    this.seeForm.reset();
  }

  selectData(dep){
    this.depEdit = dep;
    console.log(this.depEdit.id)
  }

  createDep(post){
    this.nameCountry =post.nombre;
    this.codCountry = post.codpais;
    this.createCountry = post.pais;
    if (post) {
      this._departmentservice.createDepartments({ 'nombre': this.nameCountry, "codigo": this.codCountry, "pais_id": this.createCountry, 
                                                  'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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

  updateDep(dep){
    if(this.depEdit){
      this._departmentservice.updateDepartments({ 'nombre': this.depEdit.nombre, 'id': this.depEdit.id, 'pais_id': this.country, 'codigo': this.depEdit.codigo,
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

  deleteDep() {
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
        if (this.depEdit) {
          console.log(this.depEdit.id)
          this._departmentservice.deleteDepartments(this.depEdit.id).subscribe(
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

  openModal (dep) {
    this.toogleEdit = false;
    for (let i = 0; i < this.countries.length; i++) {
      if ( dep.pais == this.countries[i]['nombre']) {
        this.countryEdit = this.countries[i]['nombre'];
        console.log(this.countryEdit)
      }
    }
    jQuery('#modal-see').modal('open');
    jQuery('input[type=text]').attr({style:' box-shadow: none'});    
    this.depEdit = Object.assign({}, dep);
    console.log(this.depEdit)
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
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }
    
    if(this.cont > 1) {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');          
    } else if (this.cont <= 1 && this.toogleDelete == true){
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');           
    }

  }

  edit () {
    jQuery('#nombreEdit').prop('disabled',false);
    jQuery('#selectPais').prop('disabled',false);
    jQuery('#codpaisEdit').prop('disabled',false);
    jQuery('#nombreEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#selectPais').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#codpaisEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#selectPais').children('option[value="nodisplay"]').css('display','none');
    jQuery('#selectPais').on('change', () => {
      this.country = jQuery('#selectPais').val();
    });
  }

}

