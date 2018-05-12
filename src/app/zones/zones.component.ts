import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesService } from '../services/zones.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';
import { Zones } from './zones';

declare let jQuery:any;

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zones: any[] = [];
  toogleDelete:boolean = false; toogleEdit: boolean = false;
  zoneEdit:any; zone:any; cityEdit:any; 
  cities:string; nombre: string; createCity: string;

  rForm: FormGroup;
  seeForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {Zones[]} 
   */
  count: Zones[];

  /**
   * @type {Zones} 
   */

  filter: Zones = new Zones();

  /**
   * @type {number} 
   */
  numberOfZones: number;

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

  constructor(private _zoneservice: ZonesService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'nombre': [null, Validators.required],
      'ciudad': [null, Validators.required],
    });

    this.seeForm = fb.group({
      'nombre-ver': [null, Validators.required],
    });

  }

  ngOnInit() {
    this._zoneservice.getZones().subscribe(data => {
      this.zones = data.zonas;
      this.cities = data.ciudades;
      console.log(this.cities[0]['nombre'])
    });
    this._zoneservice.getZonesFilter().subscribe(
      (count: Zones[]) => {
        this.count = count;
        this.numberOfZones = this.count.length;
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

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  resetForms() {
    this.rForm.reset();
    this.seeForm.reset();
    jQuery('input[type=text]').attr({style:' box-shadow: none'});  
  }
  
  selectData(zone){
    this.zoneEdit = zone;
  }

  createZone(post){
    this.nombre = post.nombre;
    this.createCity = post.ciudad;
    if (post) {
      this._zoneservice.createZones({ 'ciudad_id': this.createCity, 'nombre': this.nombre, 'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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

  updateZone(){
    if(this.zoneEdit){
      this._zoneservice.updateZones({'ciudad_id': this.zone, 'nombre': this.zoneEdit.nombre, 'id': this.zoneEdit.id, 'usuario_id': localStorage.getItem('usuario_id'),
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

  deleteZone() {
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
        if (this.zoneEdit) {
          this._zoneservice.deleteZones(this.zoneEdit.id).subscribe(
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
              'No se pudo eliminar el registro',
              '',
              'warning'
            )
          })
        } 
      }
    })
  }

  openModal (zone) {
    this.toogleEdit = false;
    for (let i = 0; i < this.cities.length; i++) {
      if ( zone.ciudad == this.cities[i]['nombre']) {
        this.cityEdit = this.cities[i]['nombre'];
        console.log(this.cityEdit)
      }
    }
    jQuery('#modal-see').modal('open');
    this.zoneEdit = Object.assign({}, zone);
    jQuery('input[type=text]').attr({style:' box-shadow: none'});    
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
    jQuery('#selectEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#selectEdit').on('change', () => {
      this.zone = jQuery('#selectEdit').val();
      console.log(this.zone)
    });
  }

}
