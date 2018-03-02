import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import swal from 'sweetalert2';

declare let jQuery:any;

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any[] = [];
  toogleDelete:boolean = false;
  countriesEdit:any;

  constructor(private _countryservice: CountriesService) { }

  ngOnInit() {
    this._countryservice.getCountries().subscribe(data => {
      this.countries = data.paises;
    });
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
        jQuery('#codigoEdit').prop('disabled',true);
        jQuery('#nombreEdit').prop('disabled',true);
        jQuery('#selectEdit').prop('disabled',true);
       }}); 
  }

  selectData(country){
    this.countriesEdit = country;
  }

  openModal (country) {
    jQuery('#modal-see').modal('open');
    this.countriesEdit = country;
    console.log(this.countriesEdit)
    //document.getElementsByClassName('table-radio');
  }

  createCountry(name){
    if (name) {
      this._countryservice.createCountries({ 'nombre': name, 'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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
      text: "You won't be able to revert this!",
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
 