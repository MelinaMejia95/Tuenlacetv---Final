import { Component, OnInit } from '@angular/core';
import { AutoBillsService } from '../services/autobills.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

declare let jQuery:any;

@Component({
  selector: 'app-automaticbills',
  templateUrl: './automaticbills.component.html',
  styleUrls: ['./automaticbills.component.css']
})
export class AutomaticbillsComponent implements OnInit {

  bills: any = []; zones: any; typeFacts: any; model1: any; model2: any; model3: any; model4:any; model5: any; model6: any;
  createFact: string; createZone: string; showCorte: number; showPagos: number;

  rForm: FormGroup;
  titleAlert: string = "Campo requerido";

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private _autobillservice: AutoBillsService, private fb: FormBuilder) { 

    this.rForm = fb.group({
      'tipofacturacion': [null, Validators.required],
      'elaboracionfac': [null, Validators.required],
      'inicioperiodo': [null, Validators.required],
      'finperiodo': [null, Validators.required],
      'fechavence': [null, Validators.required],
      'zona': [null, Validators.required],
      'observaciones': [null, Validators.required],      
    });

  }

  ngOnInit() {
    this._autobillservice.getInfo().subscribe(data => {
      console.log(data)
      this.zones = data.zonas
      this.typeFacts = data.tipo_facturacion;
      if (data.fecha_corte == 'S'){
        this.showCorte = 1;
      } else if (data.fecha_corte == 'N') {
        this.showCorte = 0;
      }
      if (data.fecha_pagos_ven == 'S'){
        this.showPagos = 1;
      } else if (data.fecha_pagos_ven == 'N') {
        this.showPagos = 0;
      }
      console.log(this.showCorte, this.showPagos)
    });
  }

  elabFactura(event: IMyDateModel) {
    this.model1 = event.formatted ;
  }

  inicioPeriodo(event: IMyDateModel) {
    this.model2 = event.formatted ;
  }

  finPeriodo(event: IMyDateModel) {
    this.model3 = event.formatted ;
  }

  fechaVence(event: IMyDateModel) {
    this.model4 = event.formatted ;
  }

  suspServ(event: IMyDateModel) {
    this.model5 = event.formatted ;
  }

  pagoVence(event: IMyDateModel) {
    this.model6 = event.formatted ;
  }

  createBill(post) {
    if (post) {
      this._autobillservice.createAutobills({
        "tipo_facturacion_id": Number(post.tipofacturacion),
        "f_elaboracion": this.model1,
        "f_inicio": this.model2, 
        "f_fin": this.model3, 
        "f_vence": this.model4, 
        "f_corte": this.model5, 
        "f_vencidos": this.model6,
        "observa": post.observaciones,
        "zona": post.zona,
        "usuario_id": localStorage.getItem('usuario_id'),
        "db": localStorage.getItem('db')
    }).subscribe(
        data => {
          console.log(data)
          if (data.status == "created" ) {
            swal({
              title: 'Facturación generada con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else if (data.error == "ya generada" ){
            swal(
              'La facturación de este mes ya fue generada, revise...',
              '',
              'warning'
            )
          } else if (data.error == "error en el proceso" ){
            swal(
              'No se generó la facturación',
              '',
              'warning'
            )
          } else if (data.error == "ya generada para esta zona" ){
            swal(
              'La facturación de este mes ya fue generada para esta zona, revise...',
              '',
              'warning'
            )
          }
        },
      );
    } 
  }

}
