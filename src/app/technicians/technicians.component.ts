import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { TechniciansService } from '../services/technicians.service';

declare let jQuery:any;

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  toogleDelete:boolean = false; toogleArticle: boolean = true;
  technicians: any[] = []; techEdit: any; concepts: any; rates: any; techs: any; employee: any; groups: any; articles: any; details: any[] = [];
  valor: number; porIva: number; valorIva: number = 0; valorSinIva: number = 0; total: number = 0; cantidad: number ; groupAdd: any; articleAdd: any;
  detailEdit: any[] =[]; techsLenght: any; auxArray: any[] = [];

  rForm: FormGroup;
  titleAlert: string = "Campo requerido";

  constructor(private _techservice: TechniciansService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'grupoArticulos': [null, Validators.required],
      'articulos': [null, Validators.required],
      'valor': [null, Validators.required],
      'cantidad': [null, Validators.required],
      'porIva': [null, Validators.required],
      'iva': [null],      
    })

  }

  ngOnInit() {
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal();
    this._techservice.getTechs().subscribe(data => {
      console.log(data)
      this.technicians= data.ordenes;
      this.groups = data.grupos;
      this.articles = data.articulos;
    });
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#tiposervicioEdit').prop('disabled',true);
      jQuery('#nombreEdit').prop('disabled',true);
     }});
  }

  openModal (tech) {
    this.valorIva = 0;
    this.techEdit = tech;
    this.techsLenght = tech.detalle;
    console.log(tech)
    for (let i = 0; i < this.techsLenght.length; i++) {
      this.details[i] = {'id': i,'articulo':this.techsLenght[i]['articulo'], 'cantidad':this.techsLenght[i]['cantidad'], 'grupo':this.techsLenght[i]['grupo'],
                        'iva':this.techsLenght[i]['iva'], 'porIva':this.techsLenght[i]['porIva'], 'total':this.techsLenght[i]['total'], 
                        'valor':this.techsLenght[i]['valor']}
     // console.log(this.details[i]);
    }
    
    this._techservice.getInfoTechs().subscribe(data => {
      console.log(data)
      this.concepts = data.conceptos;
      this.rates = data.tarifas;
      this.techs = data.tecnicos;
      this.employee = data.empleados;
    });
    for (let i = 0; i < this.concepts.length; i++) {
      if (this.techEdit.tipo_orden == this.concepts[i]['abreviatura']) {
        
      }
    }
    jQuery('#modal-see').modal('open');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(tech){
    this.techEdit = tech;
  }
  
  selectDetail(detail) {
    this.detailEdit = detail;
  }

  addDetail(post){
    console.log(post.cantidad)
    this.total = Number(post.valor) * Number(post.cantidad)
    for(let i = 0; i < this.groups.length ; i++) {
      if (post.grupoArticulos == this.groups[i]['id']){
        this.groupAdd = this.groups[i]['descripcion'];
        console.log(this.groupAdd)
      }
    }
    for(let i = 0; i < this.articles.length ; i++) {
      if (post.articulos == this.articles[i]['id']){
        this.articleAdd = this.articles[i]['nombre'];
        console.log(this.articleAdd)
      }
    }
    this.details[this.details.length] = {'articulo': this.articleAdd, 'cantidad': post.cantidad, 'grupo': this.groupAdd,
                                        'iva': post.iva, 'porIva': post.porIva, 'total': this.total, 'valor': post.valor}
  }

  removeDetail() {
    this.auxArray = [];
    let j = 0;
    for (let i = 0; i < this.details.length; i++) {
      if(this.detailEdit['id'] != this.details[i]['id']){
        console.log('entro detail')
        this.auxArray[j] = this.details[i]
        j++;
      }
    }
    this.details = this.auxArray;
    console.log(this.details)
  }

  changeData(){
    this.valorSinIva = 0;
    this.valorIva = 0;
    this.valorSinIva = Number(this.valor / (this.porIva / 100 + 1));
    this.valorIva = Math.round(this.valor - this.valorSinIva);
  }

  validateDetail() {
    jQuery('#btn-detail').prop('disabled', false);    
    if (this.rForm.valid == true) {
      jQuery('#btn-detail').prop('disabled', false);
      console.log('btn dis')
    } else {
      jQuery('#btn-detail').prop('disabled', true)      
    }
  }

  deleteOrder() {
    swal({
      title: '¿Desea anular la orden?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.techEdit) {
          this._techservice.deleteOrder(this.techEdit.id).subscribe(
            data => {
              console.log(data)
              if ( data.status == "anulado") {
                swal({
                  title: 'Orden anulada con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              } else if ( data.error == "no se pudo anular orden") {
                swal(
                  'No se pudo anular la orden',
                  '',
                  'warning'
                )
              }
            },
          error =>{
            swal(
              'No se pudo anular el pago',
              '',
              'warning'
            )
          })
        } 
      }
    })
  }
  
  selectArticle() {
    for (let i = 0; i < this.articles.length ; i++) {
      if(jQuery('#articles').val() == this.articles[i]['id']){
        this.valor = Number(this.articles[i]['costo']);
        this.porIva = Number(this.articles[i]['porcentajeIva']);
        console.log(this.valor);
        console.log(this.porIva);
      }
    }
    this.valorSinIva = Number(this.valor / (this.porIva / 100 + 1));
    console.log(this.valorSinIva)
    this.valorIva = Math.round(this.valor - this.valorSinIva);
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
        this.toogleDelete = true;
        document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  selectRowDetail() {
    var rows = <HTMLInputElement><any>document.getElementsByName('rows-detail');
    var check = <HTMLInputElement><any>document.getElementsByName('group3');
    var cantidad = document.getElementsByName('group3');

    if (this.toogleArticle == true) {
      document.getElementById('btn-remove-detail').setAttribute('style', 'visibility: hidden');
      this.toogleArticle = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        this.toogleArticle = true;
        document.getElementById('btn-remove-detail').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  edit () {
    jQuery('.select-edit').prop('disabled', false);
    /*jQuery('#tiposervicioEdit').prop('disabled',false);
    jQuery('#nombreEdit').prop('disabled',false);
    jQuery('#codigoEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tiposervicioEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#nombreEdit').attr({style:' margin: 2px 0 7px 0 !important;'});
    jQuery('#tiposervicioEdit').children('option[value="nodisplay"]').css('display','none');
    jQuery('#tiposervicioEdit').on('change', () => {
      this.plan = jQuery('#tiposervicioEdit').val();
    });*/
  }

}
