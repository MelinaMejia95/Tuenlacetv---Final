import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlansService } from '../services/plan.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Plans } from './plans';

declare let jQuery:any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  toogleDelete:boolean = false; toogleEdit: boolean = false;
  plans: any[] = []; planEdit: any; serviceEdit: any; plan: string;
  services: string; createService: string; nombre: string;

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Plans[]} 
   */
  count: Plans[];

  /**
   * @type {Plans} 
   */

  filter: Plans = new Plans();

  /**
   * @type {number} 
   */
  numberOfPlans: number;

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

  constructor(private _planservice: PlansService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'tiposerv': [null, Validators.required],
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required],
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
    this._planservice.getPlans().subscribe(data => {
      this.plans = data.planes;
      this.services = data.servicios;
    });
    this._planservice.getPlansFilter().subscribe(
      (count: Plans[]) => {
        this.count = count;
        this.numberOfPlans = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#tiposervicioEdit').prop('disabled',true);
      jQuery('#nombreEdit').prop('disabled',true);
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

  resetForms() {
    this.rForm.reset();
    this.seeForm.reset();
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  openModal (plan) {
    for (let i = 0; i < this.services.length; i++) {
      if ( plan.servicio == this.services[i]['nombre']) {
        this.serviceEdit = this.services[i]['nombre'];
      }
    }
    this.planEdit = Object.assign({}, plan);
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(plan){
    this.planEdit = plan;
  }

  createPlan(post){
    this.createService = post.tiposerv;
    this.nombre = post.nombre;
    if (post) {
      this._planservice.createPlans({  'servicio_id': this.createService, 'nombre': this.nombre, 
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

  updatePlan() {
    if(this.planEdit){
      this._planservice.updatePlans({ 'servicio_id': this.plan, 'id': this.planEdit.id, 'nombre': this.planEdit.nombre,
                                    'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
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

  deletePlan(){
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
        if (this.planEdit) {
          this._planservice.deletePlans(this.planEdit.id).subscribe(
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
                'No se pudo eliminar el registro',
                '',
                'warning'
              )
            });
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
    jQuery('#tiposervicioEdit').prop('disabled',false);
    jQuery('#nombreEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tiposervicioEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nombreEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tiposervicioEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#tiposervicioEdit').on('change', () => {
      this.plan = jQuery('#tiposervicioEdit').val();
    });
  }


}
