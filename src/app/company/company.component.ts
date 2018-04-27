import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../services/companies.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Companies } from './company';

declare let jQuery:any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  toogleDelete:boolean = false;
  companies: any[] = []; rep: any[] = [];
  companyEdit: any; cityEdit: any; city: any; entity: any; contr: any; regi: any;
  cities: string; people: string; createCity: string; createEntity: string; createRegi: string; createContr: string; nit: string; razonsocial: string;
  direccion: string; tel1: string; tel2: string; correo: string; centrocosto: string;

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";
  correoAlert: string = "Correo inválido"

  /* /**
   * @type {Companies[]} 
   */
  count: Companies[];

  /**
   * @type {Companies} 
   */

  filter: Companies = new Companies();

  /**
   * @type {number} 
   */
  numberOfCompanies: number;

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

  constructor(private _companyservice: CompaniesService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nit': [null, Validators.required],
      'razonsocial': [null, Validators.required],
      'direccion': [null, Validators.required],
      'tel1': [null, Validators.required],
      'ciudad': [null, Validators.required],
      'representante': [null, Validators.required],
      'correo': [null, Validators.email],
      'regimen': [null, Validators.required],
      'centrocosto': [null, Validators.required],
      'tel2': [null],
      'contribuyente': [null]
    });

    this.seeForm = fb.group({
      'nit-ver': [null, Validators.required],
      'razon-ver': [null, Validators.required],
      'direccion-ver': [null, Validators.required],
      'tel1-ver': [null, Validators.required],
      'correo-ver': [null, Validators.email],
      'centro-ver': [null, Validators.required]
    });

  }

  ngOnInit() {
    this._companyservice.getCompanies().subscribe(data => {
      this.companies = data.empresas;
      this.cities = data.ciudades;
      this.people = data.representantes;
      console.log(data.empresas)
    });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#nitEdit').prop('disabled',true);
      jQuery('#razonEdit').prop('disabled',true);
      jQuery('#direccionEdit').prop('disabled',true);
      jQuery('#tel1Edit').prop('disabled',true);
      jQuery('#tel2Edit').prop('disabled',true);
      jQuery('#ciudadEdit').prop('disabled',true);
      jQuery('#representanteEdit').prop('disabled',true);
      jQuery('#fileEdit').prop('disabled',true);
      jQuery('#logoEdit').prop('disabled',true);
      jQuery('#correoEdit').prop('disabled',true);
      jQuery('#contribuyenteEdit').prop('disabled',true);
      jQuery('#regimenEdit').prop('disabled',true);
      jQuery('#centroEdit').prop('disabled',true);
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

  openModal (company) {
    this.companyEdit = company;
    this.rep = company.representante;
    console.log(this.rep)
    for (let i = 0; i < this.cities.length; i++) {
      if ( company.ciudad == this.cities[i]['nombre']) {
        this.cityEdit = this.cities[i]['nombre'];
      }
    }
    for (let i = 0; i < this.people.length; i++) {
      if ( company.representante == this.people[i]['nombres']) {
        this.cityEdit = this.people[i]['nombres'];
      }
    }
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
  }

  selectData(company){
    this.companyEdit = company;
    this.rep = company.representante;
  }

  updateCompany() {
    if(this.companyEdit){
      this._companyservice.updateCompanies({ 'id': this.companyEdit.id, 'nit': this.companyEdit.nit, 'razonsocial': this.companyEdit.razonsocial, 'direccion': this.companyEdit.direccion,
                                    'telefono1': this.companyEdit.telefono1, 'telefono2': this.companyEdit.telefono2, 'ciudad_id': this.city,
                                    'entidad_id':  this.entity, 'correo': this.companyEdit.correo, 'regimen': this.regi, 'contribuyente': this.contr, 'centrocosto': this.companyEdit.centrocosto,
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
              'No se pudo actualizar el registro',
              '',
              'warning'
            )
          }
        }
      );
    }
  }

  createCompany (post) {
    this.nit = post.nit;
    this.razonsocial = post.razonsocial;
    this.direccion = post.direccion;
    this.tel1 = post.tel1;
    this.tel2 = post.tel2;
    this.createCity = post.ciudad;
    this.createEntity = post.representante;
    this.correo = post.correo;
    this.createRegi = post.regimen;
    this.createContr = post.contribuyente;
    this.centrocosto = post.centrocosto;
    if (post) {
      this._companyservice.createCompanies({ 'nit': this.nit, 'razonsocial': this.razonsocial, 'direccion': this.direccion, 'telefono1': this.tel1, 'telefono2': this.tel2, 
                                            'ciudad_id': this.createCity, 'entidad_id': this.createEntity, 'correo': this.correo, 'regimen': this.createRegi, 'centrocosto': this.centrocosto,
                                            'contribuyente': this.createContr, 'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
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

  deleteCompany(){
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
        if (this.companyEdit) {
          this._companyservice.deleteCompanies(this.companyEdit.id).subscribe(
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
    jQuery('#nitEdit').prop('disabled',false);
    jQuery('#razonEdit').prop('disabled',false);
    jQuery('#direccionEdit').prop('disabled',false);
    jQuery('#tel1Edit').prop('disabled',false);
    jQuery('#tel2Edit').prop('disabled',false);
    jQuery('#ciudadEdit').prop('disabled',false);
    jQuery('#representanteEdit').prop('disabled',false);
    jQuery('#fileEdit').prop('disabled',false);
    jQuery('#logoEdit').prop('disabled',false);
    jQuery('#correoEdit').prop('disabled',false);
    jQuery('#contribuyenteEdit').prop('disabled',false);
    jQuery('#regimenEdit').prop('disabled',false);
    jQuery('#centroEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nitEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#razonEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#direccionEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tel1Edit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tel2Edit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#ciudadEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#representanteEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#fileEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#logoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#correoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#contribuyenteEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#regimenEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#centroEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('.select-city').children('option[value="nodisplay"]').css('display','none');
    jQuery('#ciudadEdit').on('change', () => {
      this.city = jQuery('#ciudadEdit').val();
    });
    jQuery('#representanteEdit').on('change', () => {
      this.entity = jQuery('#representanteEdit').val();
    });
    jQuery('#regimenEdit').on('change', () => {
      this.regi = jQuery('#regimenEdit').val();
    });
    jQuery('#contribuyenteEdit').on('change', () => {
      this.contr = jQuery('#contribuyenteEdit').val();
    });
  }

}
