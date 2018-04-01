import { Component, OnInit } from '@angular/core';
import { AutoBillsService } from '../services/autobills.service';
import swal from 'sweetalert2';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';

declare let jQuery:any;

@Component({
  selector: 'app-automaticbills',
  templateUrl: './automaticbills.component.html',
  styleUrls: ['./automaticbills.component.css']
})
export class AutomaticbillsComponent implements OnInit {

  bills: any = []; zones: any; typeFacts: any; model1: any; model2: any; model3: any; model4:any; model5: any; model6: any;
  createFact: string; createZone: string;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private _autobillservice: AutoBillsService) { }

  ngOnInit() {
    this._autobillservice.getInfo().subscribe(data => {
      this.zones = data.zonas
      this.typeFacts = data.tipo_facturacion;
    });

    jQuery('#selectFact').on('change', () => {
      this.createFact = jQuery('#selectFact').val();
    });

    jQuery('#selectZone').on('change', () => {
      this.createZone = jQuery('#selectZone').val();
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

  createBill(observaciones) {
    if (observaciones) {
      this._autobillservice.createAutobills({
        "tipo_facturacion_id": Number(this.createFact),
        "f_elaboracion": this.model1,
        "f_inicio": this.model2, 
        "f_fin": this.model3, 
        "f_vence": this.model4, 
        "f_corte": this.model5, 
        "f_vencidos": this.model6,
        "observa": observaciones,
        "zona": this.createZone,
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
        /* error => {
          if (error.error == "ya generada") {
            swal(
              'La facturación de este mes ya fue generada',
              'Revise',
              'warning'
            )
          }
        } */
      );
    } 
  }

}
