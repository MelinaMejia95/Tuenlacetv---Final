import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NeighborhoodsService } from '../services/neighborhoods.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Neighs } from './neighborhoods';

declare let jQuery:any;

@Component({
  selector: 'app-neighborhoods',
  templateUrl: './neighborhoods.component.html',
  styleUrls: ['./neighborhoods.component.css']
})
export class NeighborhoodsComponent implements OnInit {

  neighborhoods: any[] = [];
  toogleDelete: boolean = false; toogleEdit: boolean = false;
  zones: string; nombre: string; createZone: string;
  neighborhoodEdit: any; zoneEdit: any; neighborhood: any;

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

   /**
   * @type {Neighs[]} 
   */
  count: Neighs[];

  /**
   * @type {Neighs} 
   */

  filter: Neighs = new Neighs();

  /**
   * @type {number} 
   */
  numberOfNeighs: number;

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

  constructor(private _neighborhoodservice: NeighborhoodsService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'zona': [null, Validators.required],
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
    this._neighborhoodservice.getNeighborhoods().subscribe(data => {
      this.neighborhoods = data.barrios;
      this.zones = data.zonas;
      console.log(this.zones[0]['nombre'])
    });
    this._neighborhoodservice.getNeighsFilter().subscribe(
      (count: Neighs[]) => {
        this.count = count;
        this.numberOfNeighs = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
        jQuery('#codigoEdit').prop('disabled',true);
        jQuery('#nombreEdit').prop('disabled',true);
        jQuery('#selectEdit').prop('disabled',true);
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
    jQuery('input[type=text]').attr({style:' box-shadow: none'});        
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  selectData(neighborhood){
    this.neighborhoodEdit = neighborhood;
  }

  createNeighborhood(post){
    this.createZone = post.zona;
    this.nombre = post.nombre
    if (post) {
      this._neighborhoodservice.createNeighborhoods({ 'zona_id': this.createZone, 'nombre': this.nombre, 'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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

  updateNeighborhood() {
    if(this.neighborhoodEdit){
      this._neighborhoodservice.updateNeighborhoods({'zona_id': this.neighborhood, 'nombre': this.neighborhoodEdit.nombre, 'id': this.neighborhoodEdit.id, 'usuario_id': localStorage.getItem('usuario_id'),
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

  deleteNeighborhood() {
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
        if (this.neighborhoodEdit) {
          this._neighborhoodservice.deleteNeighborhoods(this.neighborhoodEdit.id).subscribe(
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

  openModal (neighborhood) {
    this.toogleEdit = false;    
    for (let i = 0; i < this.zones.length; i++) {
      if ( neighborhood.zona == this.zones[i]['nombre']) {
        this.zoneEdit = this.zones[i]['nombre'];
        console.log(this.zoneEdit)
      }
    }
    this.neighborhoodEdit = Object.assign({}, neighborhood);
    jQuery('input[type=text]').attr({style:' box-shadow: none'});        
    jQuery('#modal-see').modal('open');
    //document.getElementsByClassName('table-radio');
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
    jQuery('#selectEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#selectEdit').on('change', () => {
      this.neighborhood = jQuery('#selectEdit').val();
      console.log(this.neighborhood)
    });
  }

}
