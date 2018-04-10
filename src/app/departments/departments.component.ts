import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from '../services/departments.service';
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
  selected: number;
  toogleDelete:boolean = false;
  countries:string; countryEdit: string; nameCountry: string; codCountry: string;
  depEdit:any; country: any; createCountry: any;

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

  constructor(private _departmentservice: DepartmentsService, private fb: FormBuilder) {

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'pais': [null, Validators.required],
      'codpais': [null],
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required]
    });

   }

  ngOnInit() {
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
       }});
/*     jQuery('#select-country').on('change', () => {
      this.createCountry = jQuery('#select-country').val();
    }); */
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
    for (let i = 0; i < this.countries.length; i++) {
      if ( dep.pais == this.countries[i]['nombre']) {
        this.countryEdit = this.countries[i]['nombre'];
      }
    }
    jQuery('#modal-see').modal('open');
    this.depEdit = dep;
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

