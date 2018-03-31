import { Component, OnInit } from '@angular/core';
import { ConceptsService } from '../services/concepts.service';
import swal from 'sweetalert2';
import { Concepts } from './concepts';

declare let jQuery:any;

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.css']
})
export class ConceptsComponent implements OnInit {

  toogleDelete:boolean = false;
  concepts: any[] = [];
  services: string; createService: string; nameService: string;
  serviceEdit: any; conceptEdit: any; concept: any;

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

  constructor(private _conceptservice: ConceptsService) { }

  ngOnInit() {
    this._conceptservice.getConcepts().subscribe(data => {
      this.concepts = data.conceptos;
      this.services = data.servicios;
      console.log(data.servicios)
    });
    this._conceptservice.getConceptsFilter().subscribe(
      (count: Concepts[]) => {
        this.count = count;
        this.numberOfConcepts = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
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
     }});
     jQuery('#select-cities').on('change', () => {
      this.createService = jQuery('#select-cities').val();
      for (let i = 0; i < this.services.length; i++) {
        if ( this.createService== this.services[i]['id']) {
          this.nameService = this.services[i]['nombre'];
        }
      }
    });
  }

  openModal (concept) {
    for (let i = 0; i < this.services.length; i++) {
      if ( concept.servicio == this.services[i]['nombre']) {
        this.serviceEdit = this.services[i]['nombre'];
      }
    }
    this.conceptEdit = concept;
    jQuery('#modal-see').modal('open');
    document.getElementsByClassName('table-radio');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(concept){
    this.conceptEdit = concept;
  }

  createConcept(codigo, nombre, porcentajeIva, operacion, abreviatura){
    if (nombre) {
      this._conceptservice.createConcepts({ 'codigo': codigo, 'servicio_id': this.createService, 'nombre': nombre, 'abreviatura': abreviatura, 'porcentajeIva': porcentajeIva,
                                      'operacion': operacion, 'usuario_id': localStorage.getItem('usuario_id'), 'db': localStorage.getItem('db')}).subscribe(
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
          } else  {
            swal(
              'No se pudo crear el registro',
              '',
              'warning'
            )
          }
        },
        error => {
          if ( error.contenido == "has already been taken") {
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
