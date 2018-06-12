import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { TechniciansService } from '../services/technicians.service';
import { ExcelService } from '../services/excel.service';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import {IMyDpOptions, IMyDateModel, IMyInputFocusBlur, IMyDate} from 'mydatepicker';
import { Techs } from './technician'

declare let jQuery:any;

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  toogleDelete:boolean = false; toogleArticle: boolean = true; toogleEdit: boolean = false;
  technicians: any[] = []; techEdit: any; concepts: any; rates: any; techs: any; employee: any; groups: any; articles: any; details: any[] = [];
  valor: number; porIva: number = 0; valorIva: number = 0; valorSinIva: number = 0; total: number = 0; cantidad: number ; groupAdd: any; articleAdd: any;
  detailEdit: any[] =[]; techsLenght: any; auxArray: any[] = []; techDetail: number; param_corte: string; param_instalacion: string; param_rco: string;
  param_retiro: string; switchAlert: number; response: string; editDetail: number; modelDate: any; disabled: boolean = true; disabled2: boolean = true;
  post: any; detail: any; fechaven: string; model1: any; model2: any; tech: any; contador: number = 0; counter: number = 0;

  rForm: FormGroup;  printForm: FormGroup;
  orderForm: FormGroup;
  titleAlert: string = "Campo requerido";

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  private selDate: IMyDate = {year: 0, month: 0, day: 0};
  private selDate2: IMyDate = {year: 0, month: 0, day: 0};

  /**
   * @type {Techs[]} 
   */
  count: Techs[];

  /**
   * @type {Techs} 
   */

  filter: Techs = new Techs();

  /**
   * @type {number} 
   */
  numberOfTechs: number;

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

  constructor(private _techservice: TechniciansService, private fb: FormBuilder, private excelService: ExcelService) { 

    this.rForm = fb.group({
      'grupoArticulos': [null, Validators.required],               
      'articulos': [null, Validators.required],
      'valor': [null, Validators.required],
      'cantidad': [null, Validators.required],
      'porIva': [null, Validators.required],
      'iva': [null],      
    })

    this.orderForm = fb.group({ 
      'fechaven': [null, Validators.required],
      //'empleado': [null, Validators.required],
      'observaciones': [null, Validators.required],
      'solucion': [null, Validators.required],    
      'solicitado': [null],
      'fechaorden': [null]
    })

    this.printForm = fb.group({
      'fechainicio': [null, Validators.required],
      'fechafin': [null, Validators.required],          
    })

    let date = new Date();
    this.modelDate = {date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
      }
    console.log(this.modelDate)

  }

  ngOnInit() {
    document.querySelector('.principal-container').classList.add('modal-flow');    
    if(jQuery( window ).width() <= 600) {
      document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
     } else {
      document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
     }
    jQuery( window ).resize( function () {
      if(jQuery( window ).width() <= 600) {
      document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      } else {
       document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      }
    })
    jQuery('#modal-crear').modal();
    jQuery('#modal-imprimir').modal();    
    jQuery('#modal-see').modal();
    this._techservice.getTechs().subscribe(data => {
      console.log(data)
      this.technicians= data.ordenes;
      this.groups = data.grupos;
      this.articles = data.articulos;
      this.param_corte = data.param_corte;
      this.param_instalacion = data.param_instalacion;
      this.param_rco = data.param_rco;
      this.param_retiro = data.param_retiro;
    });
    this._techservice.getTechsFilter().subscribe(
      (count: Techs[]) => {
        this.count = count;
        this.numberOfTechs = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    this.valorIva = 0;
    jQuery('select').material_select();
    jQuery('#modal-crear').modal();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery('#codigoEdit').prop('disabled',true);
      jQuery('#tiposervicioEdit').prop('disabled',true);
      jQuery('#nombreEdit').prop('disabled',true);
      jQuery('.select-edit').prop('disabled', true);          
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

  ngOnDestroy () {
    document.querySelector('.principal-container').classList.remove('modal-flow');    
  }

  disableButton(){
    this.toogleEdit = true;
    this.onChanges();
  }

  onChanges(): void { 
    this.rForm.valueChanges.subscribe(val => {  
      if(this.rForm.valid == true && this.toogleEdit == true) {
        jQuery('#btn-detail').prop('disabled', false);
      } else if(this.rForm.valid == false){    
        jQuery('#btn-detail').prop('disabled', true);
      }
    });
  }

  resetForms() {
    this.printForm.reset();
    this.counter = 0;
    this.details = [];
  }

  changeEntity(){
    localStorage.setItem('entidad', '1');
  }

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  onDatePrint(event) {
    this.model1 = event.formatted ;
  }

  onDatePrint2(event) {
    this.model2 = event.formatted ;
  }

  exportToExcel(post){
    this._techservice.downloadOrder({'fechaini': this.model1, 'fechafin': this.model2,
                                   "db": localStorage.getItem('db') }).subscribe(data => {
      console.log(data)
      this.excelService.exportAsExcelFile(data.listado_ordenes, 'Ordenes', 4);
    });
    this.printForm.reset();
  }

  openModal (tech) {
    jQuery( window ).resize( function () {
      if(jQuery( window ).width() <= 600) {
       document.getElementById('container-articles').setAttribute('style', 'overflow-y: auto');
      } else {
       document.getElementById('container-articles').setAttribute('style', 'overflow-y: hidden');
      }
    })
    console.log(tech)
    jQuery('.select-edit').prop('disabled', true);    
    if(tech.estado == 'APLICADO' || tech.estado == 'ANULADO'){
      jQuery('#btn-modal').css('visibility', 'hidden');
    } else {
      jQuery('#btn-modal').css('visibility', 'visible');
    }
    this.disabled = true;
    this.disabled2 = true;    
    this.editDetail = 0;
    this.valorIva = 0;
    this.techEdit = Object.assign({}, tech);
    this.techsLenght = tech.detalle;
    this.selDate = this.techEdit.fechatrn;
    this.tech = tech.tecnico;
    this.techDetail = 0
    this._techservice.getInfoTechs().subscribe(data => {
      this.concepts = data.conceptos;
      this.rates = data.tarifas;
      this.techs = data.tecnicos;
      this.employee = data.empleados;
      for (let i = 0; i < this.techs.length; i++){
        if(this.tech == this.techs[i]['nombres']){
          this.tech = this.techs[i]['id'];
          console.log(this.tech)
        }
      }
    });
    
    switch (this.techEdit.abreviatura){
      case 'INT' || 'INI' : {
        if (this.param_instalacion == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
      case 'COT' || 'COI' : {
        if (this.param_corte == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
      case 'RCT' || 'RCI' : {
        if (this.param_rco == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
      case 'RET' || 'RTI' : {
        if (this.param_retiro == 'S') {
          this.switchAlert = 1;
        } else {
          this.switchAlert = 0;
        }
        break;
      }
    } 

    jQuery('#modal-see').modal('open');
  }

  closeModal () {
    jQuery('#modal-see').modal('close');
  }

  selectData(tech){
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var cantidad = document.getElementsByName('group1');
    let splitted;
    this.contador = 0;
    for(var i = 0; i < cantidad.length; i++){
      if(check[i].checked){
        splitted = check[i].id.split('_',2);
        this.contador++;
      }
    }
    for(var j = 0; j < this.technicians.length; j++) {
      if(this.contador == 1 && Number(splitted[1]) == this.technicians[j]['id']){
        this.techEdit = this.technicians[j]
      }
    }
    console.log(this.techEdit) 
  }
  
  selectDetail(detail) {
    var check = <HTMLInputElement><any>document.getElementsByName('group3');
    var cantidad = document.getElementsByName('group3');
    let splitted;
    this.contador = 0;
    for(var i = 0; i < cantidad.length; i++){
      console.log(check[i])
      if(check[i].checked){
        splitted = check[i].id.split('_',2);
        this.contador++;
      }
    }
    for(var j = 0; j < this.details.length; j++) {
      if(this.contador == 1 && Number(splitted[1]) == this.details[j]['id']){
        this.detailEdit = this.details[j]
      }
    }
    console.log(this.detailEdit)
  }

  editOrder (detail, post) {
    console.log(this.switchAlert)
    this.post = post;
    if(this.modelDate.date.month == '10' || this.modelDate.date.month == '11' || this.modelDate.date.month == '12') {
      this.fechaven =  this.modelDate.date.day + '/' + this.modelDate.date.month + '/' +this.modelDate.date.year;
    } else {
      this.fechaven =  this.modelDate.date.day + '/0' + this.modelDate.date.month + '/' +this.modelDate.date.year;
      
    }
    this.detail = detail;
    console.log(this.fechaven)
    if (this.switchAlert == 1) {
      swal({
        title: '¿Desea cobrar días?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
            this.response = 'S';
           } else{
             this.response = 'N';
           }
           console.log(this.response) 
           this._techservice.updateOrder({'id': this.techEdit.id, 'fechaven': this.fechaven, 'observacion': this.post.observaciones, 'tecnico_id': Number(this.tech), 
                                          'solicita': this.post.solicitado, 'detalle': this.details, 'solucion': this.post.solucion, 'respuesta': this.response,
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
      })
    } else {
      this._techservice.updateOrder({'id': this.techEdit.id, 'fechaven': this.fechaven, 'observacion': this.post.observaciones, 'tecnico_id': Number(this.tech), 
      'solicita': this.post.solicitado, 'detalle': this.details, 'solucion': this.post.solucion, 'respuesta': this.response,
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
          }  else if ( data.error = "Entidad no aceptable o error de clave foranea" ) {
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
        )
    }
  }

  addDetail(post){
    this.counter++;
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
        this.articleAdd = this.articles[i]['id'];
        console.log(this.articleAdd)
      }
    }
    this.details[this.details.length] = {'id': this.counter, 'articulo_id': this.articleAdd, 'cantidad': post.cantidad, 'grupo': this.groupAdd,
                                        'iva': post.iva, 'porcentajeIva': post.porIva, 'total': Number(this.total), 'valor': post.valor}
    console.log(this.details)
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
    console.log('entro change')
    this.valorSinIva = 0;
    this.valorIva = 0;
    if(this.toogleEdit == true){
      this.toogleEdit = false;
    } else {
      this.valorSinIva = Number(this.valor / (this.porIva / 100 + 1));
      console.log(this.valorSinIva)
      if(isNaN(this.valorSinIva)){
        this.valorIva = 0;
      } else{
        this.valorIva = Math.round(this.valor - this.valorSinIva);
        console.log('entro iva')
      }
      
    }
  }

  validate() {
    if(this.orderForm.valid == true) {
      jQuery('#btn-edit').prop('disabled', false);
      console.log('valid')
    } else if( this.orderForm.valid == false){
      jQuery('#btn-edit').prop('disabled', true);
      console.log('invalid')
    }
  }

  validateDetail() {
    jQuery('#btn-detail').prop('disabled', false);    
    if (this.rForm.valid == true) {
      jQuery('#btn-detail').prop('disabled', false);
      console.log('btn dis')
    } else {
      jQuery('#btn-detail').prop('disabled', true)      
    }
    if(this.rForm.valid == true && this.orderForm.valid == true) {
      jQuery('#btn-edit').prop('disabled', false);
      console.log('valid2')
    } else if(this.rForm.valid == false || this.orderForm.valid == false) {
      jQuery('#btn-edit').prop('disabled', true);
      console.log('invalid2')
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
              if ( data.status == "anulada") {
                swal({
                  title: 'Orden anulada con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              }  else if ( data.error == "orden aplicada" ) {
                swal(
                  'No se puede anular una orden que ya está aplicada',
                  '',
                  'warning'
                )
              } else if ( data.error == "orden con pago" ) {
                swal(
                  'No se pudo anular la orden ya que tiene un pago asociado',
                  '',
                  'warning'
                )
              }else if ( data.error == "no se pudo anular orden" ) {
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
    setTimeout(() => {
      if(jQuery( window ).width() <= 600) {
        document.getElementById('container-articles').setAttribute('style', 'overflow-y: auto');
       } else {
        document.getElementById('container-articles').setAttribute('style', 'overflow-y: hidden');
       }
    }, 2000);
    /*  */
    this.toogleEdit = false;
    jQuery('#select-employee').children('option[value="nodisplay"]').css('display','none');    
    jQuery('.select-edit').prop('disabled', false);
    this.editDetail = 1;
    this.disabled2 = false;
    this.techDetail = 1; 
    jQuery('#select-employee').on('change', () => {
      this.tech = jQuery('#select-employee').val();
    });
  }

}
