import { Component, OnInit } from '@angular/core';
import { GBillingsService } from '../services/gbillings.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {PaginationInstance} from '../../../node_modules/ngx-pagination';
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import swal from 'sweetalert2';
import { ExcelService } from '../services/excel.service';
import { GBillings } from './gbillings';

declare let jQuery:any;

@Component({
  selector: 'app-gbillings',
  templateUrl: './gbillings.component.html',
  styleUrls: ['./gbillings.component.css']
})
export class GbillingsComponent implements OnInit {

  toogleDelete:boolean = false; tooglePrint: boolean = false;
  gbillings: any[] = []; zones: any[] = []; typefac: any[] = [];
  gbillingEdit: any; model1: any; model2: any; splitted: any; splitted2: any; splitted3: any; splitted4: any;

  printForm: FormGroup; facForm: FormGroup;
  titleAlert: string = "Campo requerido";

  /**
   * @type {GBillings[]} 
   */
  count: GBillings[];

  /**
   * @type {GBillings} 
   */

  filter: GBillings = new GBillings();

  /**
   * @type {number} 
   */
  numberOfGBillings: number;

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

  constructor(private _gbillingservice: GBillingsService, private fb: FormBuilder, private excelService: ExcelService) {

    this.printForm = fb.group({
      'fechainicio': [null, Validators.required],
      'fechafin': [null, Validators.required],           
    })

    this.facForm = fb.group({
      'zona': [null, Validators.required],
      'tipofac': [null, Validators.required],           
      'fechaelaboracion': [null, Validators.required],           
      'inicioPeriodo': [null, Validators.required],           
      'finPeriodo': [null, Validators.required],           
      'fechaven': [null, Validators.required],           
      'facinicial': [null, Validators.required],           
      'facfinal': [null, Validators.required],           
      'saldoinicial': [null, Validators.required],           
      'saldofinal': [null, Validators.required],           
      'corte': [null, Validators.required],           
      'nota1': [null],           
      'nota2': [null],           
      'nota3': [null]
    })

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
    this._gbillingservice.getGbillings().subscribe(data => {
      console.log(data)
      this.gbillings = data.facturaciones;
    });
    this._gbillingservice.getGBillingsFilter().subscribe(
      (count: GBillings[]) => {
        this.count = count;
        this.numberOfGBillings = this.count.length;
        this.limit = this.count.length; // Start off by showing all books on a single page.*/
      });
    jQuery('#registros').on('change', () => {
      this.config.itemsPerPage = Number(jQuery('#registros').val()); 
      console.log(jQuery('#registros').val());
      if (jQuery('#registros').val() == '10') {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: hidden');
      } else {
        document.getElementById('container-pag').setAttribute('style', 'overflow-y: auto');
      }
    })
    jQuery('.dropdown-button').dropdown();
    jQuery('#modal-imprimir').modal();    
    jQuery('#modal-factura').modal();    
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

  resetForms() {
    this.printForm.reset();
    this.facForm.reset();
  }

  exportToExcel(post){
    this._gbillingservice.downloadGBillings({'fechaini': this.model1, 'fechafin': this.model2 ,
                                             'db': localStorage.getItem('db')}).subscribe(data => {
        this.excelService.exportAsExcelFile(data, 'Facturaciones');
      });
      this.printForm.reset();
  }

  selectData(bill){
    this.gbillingEdit = bill;
    console.log(bill)
  }

  openModalImprimir() {
    if(this.tooglePrint == false){
      jQuery('#modal-imprimir').modal('open');
      console.log('null')
    } else if(this.tooglePrint == true){
      let str = this.gbillingEdit.fecha_inicio;
      let str2 = this.gbillingEdit.fecha_fin;
      this.splitted = str.split("/", 3);
      this.splitted2 = str2.split("/", 3);      
      for (let i = 0; i < 10; i++) {
        if (this.splitted[0] == "0" + i.toString()) {
          this.splitted[0] = i.toString();
        }
        if (this.splitted2[0] == "0" + i.toString()) {
          this.splitted2[0] = i.toString();
        }
        if (this.splitted[1] == "0" + i.toString()) {
          this.splitted[1] = i.toString();
        }
        if ( this.splitted2[1] == "0" + i.toString() ) {
          this.splitted2[1] = i.toString();
        }
      }
      this.printForm.patchValue({fechainicio: {
        date: {
            year: this.splitted[2],
            month:this.splitted[1],
            day: this.splitted[0]}
        }});
      this.printForm.patchValue({fechafin: {
        date: {
            year: this.splitted2[2],
            month:this.splitted2[1],
            day: this.splitted2[0]}
        }});
      jQuery('#modal-imprimir').modal('open');      
    }
  }

  openModalFacturar() {
    this._gbillingservice.getInfoGbillings().subscribe(data => {
      this.zones = data.zonas;
      this.typefac = data.tipo_facturacion;
    });
    if(this.tooglePrint == false){
      jQuery('#modal-factura').modal('open');      
    } else if(this.tooglePrint == true) {
      let str = this.gbillingEdit.fecha_inicio;
      let str2 = this.gbillingEdit.fecha_fin;
      let str3 = this.gbillingEdit.fecha_elaboracion;
      let str4 = this.gbillingEdit.fecha_vence;
      this.splitted = str.split("/", 3);
      this.splitted2 = str2.split("/", 3);   
      this.splitted3 = str3.split("/", 3);   
      this.splitted4 = str4.split("/", 3);   
      for (let i = 0; i < 10; i++) {
        if (this.splitted[0] == "0" + i.toString()) this.splitted[0] = i.toString();
        if (this.splitted[1] == "0" + i.toString()) this.splitted[1] = i.toString();
        if (this.splitted2[0] == "0" + i.toString()) this.splitted2[0] = i.toString();
        if (this.splitted2[1] == "0" + i.toString()) this.splitted2[1] = i.toString();
        if (this.splitted3[0] == "0" + i.toString()) this.splitted3[0] = i.toString();
        if (this.splitted3[1] == "0" + i.toString()) this.splitted3[1] = i.toString();
        if (this.splitted4[0] == "0" + i.toString()) this.splitted4[0] = i.toString();
        if (this.splitted4[1] == "0" + i.toString()) this.splitted4[1] = i.toString();
      }
      this.facForm.patchValue({fechaelaboracion: this.gbillingEdit.fecha_elaboracion});
      this.facForm.patchValue({inicioPeriodo: {
        date: {
            year: this.splitted[2],
            month:this.splitted[1],
            day: this.splitted[0]}
      }});
      this.facForm.patchValue({finPeriodo: {
        date: {
            year: this.splitted2[2],
            month:this.splitted2[1],
            day: this.splitted2[0]}
      }});
      this.facForm.patchValue({fechaven: {
        date: {
            year: this.splitted4[2],
            month:this.splitted4[1],
            day: this.splitted4[0]}
      }});
      jQuery('#modal-factura').modal('open');      
    }
  }

  printFac(post) {
    console.log(this.facForm.controls.fechaelaboracion)
    console.log(post)
   /*  if (post) {
      this._gbillingservice.printGBillings({
        "zona": post.zona,
        "tipo_fact": Number(post.tipofac),
        "f_elaboracion": post.fechaelaboracion.formatted,
        "f_inicio": post.inicioPeriodo.formatted,
        "f_fin": post.finPeriodo.formatted,
        "f_vencimiento": post.fechaven.formatted,
        "fact_inicial": Number(post.facinicial),
        "fact_final": Number(post.facfinal),
        "saldo_inicial": Number(post.saldoinicial),
        "saldo_final": Number(post.saldofinal),
        "f_corte": post.corte.formatted,
        "nota_1": post.nota1,
        "nota_2": post.nota2,
        "nota_3": post.nota3,
        "usuario_id": localStorage.getItem('usuario_id'),
        "db": localStorage.getItem('db')
    }).subscribe(
        data => {
          console.log(data)
          if (data.message1 == "creado servicio tv" || data.message2 == "creado servicio internet") {
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
              'No se pudo crear el registro, datos incorrectos',
              '',
              'warning'
            )
          }
        });
        error =>{
          swal(
            'No se pudo crear el registro',
            '',
            'warning'
          )
        }
    }    */
  }

  selectAll() {
    var check = <HTMLInputElement><any>document.getElementsByName('group1');
    var radios = <HTMLInputElement><any>document.getElementsByName('group2');
    var cantidad = document.getElementsByName('group1');
    var rows = <HTMLInputElement><any>document.getElementsByName('rows');
    
    if (radios[0].checked){
      //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = true;
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      }
    } else {
      //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
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
      //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      this.toogleDelete = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        console.log('false');
        this.toogleDelete = true;
        this.tooglePrint = true;
        //document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
        this.tooglePrint = false;
      }
    }    
  }


}
