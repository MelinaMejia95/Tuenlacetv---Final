import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConceptsService } from '../services/concepts.service';
import swal from 'sweetalert2';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import { Concepts } from './concepts';

declare let jQuery:any;

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.css']
})
export class ConceptsComponent implements OnInit {

  toogleDelete:boolean = false; toogleEdit: boolean = false;
  concepts: any[] = [];
  services: string; createService: string; codigo: string; nombre: string; abreviatura: string; iva: string; operacion: string;
  serviceEdit: any; conceptEdit: any; concept: any; conceptReset: any[] =[]; reset: any []= [];

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

   /**
   * @type {Concepts[]} 
   */
  count: Concepts[];

  /**
   * @type {Concepts} 
   */

  filter: Concepts = new Concepts();

  /**
   * @type {number} 
   */
  numberOfConcepts: number;

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

  constructor(private _conceptservice: ConceptsService, private fb: FormBuilder) {

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'tiposerv': [null, Validators.required],
      'codigo': [null, Validators.required],
      'abreviatura': [null, Validators.required],
      'iva': [null, Validators.required],
      'operacion': [null, Validators.required],
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required],
      'codigo-ver': [null, Validators.required],
      'abreviatura-ver': [null, Validators.required],
      'iva-ver': [null, Validators.required],
      'operacion-ver': [null, Validators.required],
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
    this._conceptservice.getConcepts().subscribe(data => {
      console.log(data)
      this.concepts = data.conceptos;
      this.conceptReset = data.conceptos;
      this.services = data.servicios;
    });
    this._conceptservice.getConceptsFilter().subscribe(
      (count: Concepts[]) => {
        this.count = count;
        this.numberOfConcepts = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('#see-form').on('change', () =>{
    });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#selectEdit').prop('disabled',true);
      jQuery('#nombreEdit').prop('disabled',true);
      jQuery('#ivaEdit').prop('disabled',true);
      jQuery('#operacionEdit').prop('disabled',true);
      jQuery('#abreviaturaEdit').prop('disabled',true);
      this.toogleEdit = false;    
      jQuery('#btn-edit').prop('disabled', true);  
      //<HTMLInputElement><any>document.getElementById("myForm").reset();
      //jQuery('#see-form').reset();
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

  openModal (concept) {
    this.toogleEdit = false;
    for (let i = 0; i < this.services.length; i++) {
      if ( concept.servicio == this.services[i]['nombre']) {
        this.serviceEdit = this.services[i]['nombre'];
      }
    }
    console.log(concept)
    //this.reset = concept;
    this.conceptEdit = Object.assign({}, concept);
    jQuery('input[type=text]').attr({style:' box-shadow: none'});    
    jQuery('#modal-see').modal('open');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(concept){
    this.conceptEdit = concept;
  }

  createConcept(post){
    this.codigo = post.codigo;
    this.createService = post.tiposerv;
    this.nombre = post.nombre;
    this.abreviatura = post.abreviatura;
    this.iva = post.iva;
    this.operacion = post.operacion;
    if (post) {
      this._conceptservice.createConcepts({ 'codigo': this.codigo, 'servicio_id': this.createService, 'nombre': this.nombre, 'abreviatura': this.abreviatura, 'porcentajeIva': this.iva,
                                      'operacion': this.operacion, 'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
        data => {
          console.log(data)
          if ( data.status == "created") {
            swal({
              title: 'Registro creado con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else  {
            swal(
              'No se pudo crear el registro',
              '',
              'warning'
            )
          }
        },
        error => {
          console.log(error._body)
          if ( error._body == `{"codigo":["has already been taken"]}`) {
            swal(
              'No se pudo crear el registro, el código ya existe',
              '',
              'warning'
            )
          }
        }
      );
    }
  } 

  updateConcept() {
    if(this.conceptEdit){
      this._conceptservice.updateConcepts({'codigo': this.conceptEdit.codigo, 'servicio_id': this.concept, 'id': this.conceptEdit.id, 'nombre': this.conceptEdit.nombre, 'abreviatura': this.conceptEdit.abreviatura,
                                    'porcentajeIva': this.conceptEdit.porcentajeIva, 'operacion': this.conceptEdit.operacion,  
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
        },
        error => {
          console.log(error._body)
          if ( error._body == `{"codigo":["has already been taken"]}`) {
            swal(
              'El código ya existe',
              '',
              'warning'
            )
          }
        }
      );
    }
  }

  deleteConcept(){
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
        if (this.conceptEdit) {
          this._conceptservice.deleteConcepts(this.conceptEdit.id).subscribe(
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
    jQuery('#codigoEdit').prop('disabled',false);
    jQuery('#tiposervicioEdit').prop('disabled',false);
    jQuery('#nombreEdit').prop('disabled',false);
    jQuery('#ivaEdit').prop('disabled',false);
    jQuery('#operacionEdit').prop('disabled',false);
    jQuery('#selectEdit').prop('disabled',false);
    jQuery('#abreviaturaEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tiposervicioEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nombreEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#ivaEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#operacionEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#abreviaturaEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#selectEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#selectEdit').on('change', () => {
      this.concept = jQuery('#selectEdit').val();
    });
  }

}
