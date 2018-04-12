import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SubscribersService } from '../services/subscribers.service';
import { PaymentsService } from '../services/payment.service';
import swal from 'sweetalert2';
import { Subs } from './subs';
import { ExcelService } from '../services/excel.service';
import {IMyDpOptions, IMyDateModel} from 'angular4-datepicker/src/my-date-picker/interfaces';
//import 'jspdf-autotable';
//import * as jsPDF from 'jspdf-autotable';
//import * as jsPDFTable from 'jspdf-autotable';

declare let jQuery:any; 
declare let jsPDF;

@Component({
  selector: 'app-suscriptor',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  toogleDelete:boolean = false;
  tipoUsuario:string; services: string; neighborhoods: string; zones: string; tipoUsuarioEdit: string; tipoFactEdit: string; listado: string; disabled: boolean = true; showint: number = 1;
  planstv: string; plansint: string; ratestv: string; typeinst: string; ratesint: string; cities: string; paramafi: string; valorafitv: any; valorafiint: any; splitted: any; model: any;
  technologies: string; typedoc: string; functions: string; states: string; equipo: any; template_fact_tv: string; createNeigh: string; createZone: string; splitted2: any; model2: any;
  createPer: string; createStrat: string; createCond: string; createNeightv: string; createZonetv: string; createStrattv: string; createTypevivtv: string; model3 : any; model4: any;
  createSeller: string; createTech: string; createTypeinst: string; createTypetech: string; createTypeserv: string; createAreainst: string; createTypefac: string; splitted3: any; model8: any;
  createPerm: string; createRatetv: string; createEquip: string; createRateint: string; createFunc: string; tv: number; int: any; createTypedoc: string; tvEdit: any; intEdit: any;
  seller: any; sellers: string; techs: string; entities: string; template: any[] = []; infoint: any[] = []; typedocEdit: any; tipodocEdit: any; estados: any[] = []
  subscribers: any[] = []; subsEdit: any; funEdit: any; neighEdit: any; zoneEdit: any; neighEditP: any; zoneEditP: any; tipofacturaciontvEdit: any;
  viv: any; sellerEdit: any; instEdit: any; serv: any; area: any; tech:any; techEdit: any; plantvEdit: any; ratestvEdit: any[] =[]; ratesintEdit: any[] = []; rows: any[] = [];
  template_fact_int: any; barriotvEdit: any; zonatvEdit: any; estratotv: any; tipoviviendatvEdit: any; permanenciaEdit: any; vendedortvEdit: any; data: any[] = []
  tipoinstalaciontvEdit: any; tipotecnologiatvEdit: any; tiposerviciotvEdit: any; areainstalaciontvEdit: any; barrioEdit: any; zonaEdit: any; 
  tipopersonaEdit: any; estratoEdit: any; condicionEdit: any; equipoEdit: any; funcionEdit: any; tarifastvEdit: any; tarifasintEdit: any; tecnicoEdit: any; facts: any;
  ratestvSelect: any[] = []; ratesintSelect: any[] = []; entity: any[] = []; option: any; createFac: string; createTypeFac: string; model5: any; model6: any; model7: any;
  pdocuments: any; ppayment : any; banks: any; nroDoc: any; formaspago: any; bancos: any; cobradores: any; total: any; abono: any[] = []; totalAplicado: number = 0; diferencia: number = 0;
  totalAplicar: number = 0; createDoc: string; model9: any; createPay: string; createBank: string; createDebt: string; detalles: any[] = []; pagado: number; totalfac: number;

  rForm: FormGroup; seeForm: FormGroup; cityForm: FormGroup; servForm: FormGroup; tvForm: FormGroup; intForm: FormGroup;
  tvCtrl: FormControl; facForm: FormGroup;
  titleAlert: string = "Campo requerido";
  correoAlert: string = "Correo inválido"
  
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  /**
   * @type {Subs[]} 
   */
  subs: Subs[];

  /**
   * @type {Subs} 
   */

  filter: Subs = new Subs();

  /**
   * @type {number} 
   */
  numberOfSubs: number;

  /**
   * @type {number} 
   */
  limit: number;

  constructor(private _suscriberservice: SubscribersService, private excelService: ExcelService, private _paymentservice: PaymentsService, private fb: FormBuilder) { 
  
    this.rForm = fb.group({
      'tipofuncion': [null, Validators.required],
      'tipodoc': [null, Validators.required],
      'numdoc': [null, Validators.required],
      'nombre1': [null, Validators.required],
      'apellido1': [null, Validators.required],
      'tel1': [null, Validators.required],         
      'direccion': [null, Validators.required],     
      'barrio': [null, Validators.required],                
      'zona': [null, Validators.required],                
      'tipopersona': [null, Validators.required],                
      'nombre2': [null],   
      'apellido2': [null],                           
      'tel2': [null],                           
      'correo':['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],                           
      'estrato': [null, Validators.required],                           
      'condicionfisica': [null],                                        
    });

    this.servForm = fb.group({
      'barrio': [null, Validators.required],                
      'zona': [null, Validators.required],                
      'tel1': [null, Validators.required],             
      'estrato': [null, Validators.required],
      'tipovivienda': [null, Validators.required],
      'fechacontrato': [null, Validators.required],
      'vendedor': [null, Validators.required],                
      'tecnico': [null, Validators.required],
      'tipoinstalacion': [null, Validators.required],
      'tipotecnologia': [null, Validators.required],
      'tiposervicio': [null, Validators.required],
      'areainstalacion': [null, Validators.required],
      'tipofacturacion': [null, Validators.required],
      'direccion': [null],                           
      'urbanizacion': [null], 
      'apartamento': [null],
      'tel2': [null],
      'contacto': [null],                                                           
      'torre': [null],                                                           
      'observacion': [null],      
      'numcontrato': [null],
      'tvCtrl':  [true],
      'intCtrl':  [null]
      //tv: this.tvCtrl,                                                                                                                                                                              
    });

    this.tvForm = fb.group({
      'planestv': [null, Validators.required],                
      'tarifastv': [null, Validators.required],                
      'televisores': [null],                           
      'decos': [null], 
      'permanencia': [null],
      'precinto': [null],
      'valorafitv': [null],                                                           
      'descuento': [null]                                                                                                                                                                                                                                        
    });

    this.intForm = fb.group({
      'planesint': [null, Validators.required],                
      'velocidad': [null, Validators.required], 
      'tarifasint': [null, Validators.required],                
      'dirip': [null],                           
      'mac1': [null],
      'mac2': [null],
      'serial': [null],                                                           
      'marcamodem': [null],
      'mascara': [null],                                                                                                                                                                                                                                        
      'dns': [null],                                                                                                                                                                                                                                        
      'gateway': [null],                                                                                                                                                                                                                                        
      'nodo': [null],                                                                                                                                                                                                                                        
      'clave': [null],                                                                                                                                                                                                                                        
      'equipo': [null],                                                                                                                                                                                                                                        
      'valorafiint': [null],                                                                                                                                                                                                                                        
      'descuento': [null],                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    });

    this.seeForm = fb.group({
      'valor-ver': [null, Validators.required],
      'fechainicio-ver': [null, Validators.required],
      'fechafin-ver': [null, Validators.required],      
    });

    this.cityForm = fb.group({
      'ciudad': [null, Validators.required],     
    });

    this.facForm= fb.group({
      'facturade': [null, Validators.required],
      'elaboracion': [null, Validators.required],
      'inicioperiodo': [null, Validators.required],
      'finperiodo': [null, Validators.required],
      'valor': [null, Validators.required],
      'observaciones': [null, Validators.required],
      "tipofac": [null]
    });

  }

  ngOnInit() {
    this._suscriberservice.getSubscribers(localStorage.getItem('entidad')).subscribe(data => {
      this.entity = data.entidades;
      //this.entity = data.senales;
      this.subscribers = data.senales;
      this.services = data.servicios;
      this.neighborhoods = data.barrios;
      this.zones = data.zonas;
      this.cities = data.ciudades;
      this.planstv = data.planes_tv;
      this.plansint = data.planes_int;
      this.ratestv = data.tarifas_tv;
      this.ratesint = data.tarifas_int;
      this.typeinst = data.tipo_instalaciones;
      this.technologies = data.tecnologias;
      this.typedoc = data.tipo_documentos;
      this.functions = data.funciones;
      this.states = data.estados;
      this.sellers = data.vendedores;
      this.techs = data.tecnicos;
      this.entities = data.entidades;
      this.tipoFactEdit = data.tipo_facturacion;
      this.paramafi = data.param_valor_afi;
      if (this.paramafi == 'N') {
        jQuery("#valorinternet").prop('disabled',true);
        jQuery("#valorafiliaciontv").prop('disabled',true);
        this.valorafitv = Number(data.valor_afi_tv);
        console.log(this.valorafitv)
        this.valorafiint = Number(data.valor_afi_int);
      } else if (this.paramafi == 'S'){
        this.valorafitv = Number(data.valor_afi_tv);
        this.valorafiint = Number(data.valor_afi_int);
      }
    });
    this._suscriberservice.getSubsFilter(localStorage.getItem('entidad')).subscribe(
      (subs: Subs[]) => {
        console.log(subs['entidades'])
        this.subs = subs['entidades'];
        this.numberOfSubs = this.subs.length;
        this.limit = this.subs.length; // Start off by showing all books on a single page.*/
    });
    this.disabled = true;
    jQuery('.select-city').children('option[value="nodisplay"]').css('display','none');
    jQuery('.collapsible').collapsible();
    jQuery('#modal-crear').modal();
    jQuery('#modal-factura').modal();
    jQuery('#modal-orden').modal();
    jQuery('#modal-pagos').modal();
    jQuery('#modal-anular').modal();
    jQuery('ul.tabs').tabs();
    jQuery('select').material_select();
    jQuery('.dropdown-button').dropdown();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery(".select-disabled:enabled").prop('disabled',true);
      this.disabled = true;
    }});
    jQuery('#mostrar').on('change', () => {
      this._suscriberservice.getEntities(jQuery('#mostrar').val()).subscribe(data => {
        localStorage.setItem('entidad', jQuery('#mostrar').val());
        this.entity = data.entidades;
      });
    });
    jQuery('#funcion').on('change', () => {
      this.tipoUsuario = jQuery('#funcion').val();
      if ( this.tipoUsuario == '1') {
        jQuery('#ciudad-user').prop('disabled',true);
        this.tv = 1;
        //jQuery('.check-type').css({"visibility" : "visible"});
        //jQuery('.hide-info').css({"visibility" : "visible"});
        //jQuery('#serv-form').css({"visibility" : "visible"});        
        setTimeout(() => jQuery('.collapsible').collapsible(), 1000);
      } else if ( this.tipoUsuario != '1') {
        this.tv = 0;
        /* jQuery('.hide-info').css({"visibility" : "hidden"}); */
        //jQuery('#serv-form').css({"visibility" : "hidden"});     
        //jQuery('.check-type').css({"visibility" : "hidden"});
        jQuery('#ciudad-user').prop('disabled',false);
      }
    });
    jQuery('#funcion').on('change', () => {
      this.createFunc = jQuery('#funcion').val();
      if(this.createFunc == '1') {
        jQuery(".service-subs")
      }
    });
    /*jQuery('#television').on('change', () =>{
        console.log('entro tv')
        if (jQuery('#television').prop('checked') == true){
          this.tv = 1;
          console.log(this.tv)
        } else {
          this.tv = 0;
          console.log(this.tv)
        }
        var changeTv = <HTMLInputElement><any>document.getElementById('television');
        if(changeTv.checked == true) {
          setTimeout(() => jQuery('.collapsible').collapsible(), 1000);
          document.getElementById('collapsible-television').setAttribute('style', 'visibility: visible');
        } else {
          document.getElementById('collapsible-television').setAttribute('style', 'visibility: hidden');
        }
      });  */
      
    jQuery('#internet').on('change', () =>{
      console.log('checkinternet')
      var changeTv = <HTMLInputElement><any>document.getElementById('internet');
      if(changeTv.checked == true) {
        setTimeout(() => jQuery('.collapsible').collapsible(), 1000);
        document.getElementById('collapsible-internet').setAttribute('style', 'visibility: visible');
        //jQuery('#collapsible-internet').collapsible('open', 0);
      } else {
        document.getElementById('collapsible-internet').setAttribute('style', 'visibility: hidden');
        //jQuery('#collapsible-internet').collapsible('close', 0);
      }
      if (jQuery('#internet').prop('checked') == true){
        this.int = 1;
        this.showint = 1;
        console.log(this.int)
      } else {
        this.int = 0;
      }
    });
    jQuery('#planestvEdit').on('change', () => {
      let j = 0;
      for (let i=0; i < this.ratestv.length ; i++) {
        if( jQuery('#planestvEdit').val() == this.ratestv[i]['plan_id']){
          this.ratestvEdit[j] =  this.ratestv[i];
          j++;
        }
      }
    });
    jQuery('#planesintEdit').on('change', () => {
      let j = 0;
      for (let i=0; i < this.ratesint.length ; i++) {
        if( jQuery('#planesintEdit').val() == this.ratesint[i]['plan_id']){
          this.ratesintEdit[j] =  this.ratesint[i];
          j++;
        }
      }
    });
  }

  validation(){
    if(this.tipoUsuario == '1') {
      if(this.rForm.valid == true && this.servForm.valid == true) {
        jQuery('#btn-crear').prop('disabled',false);
        //console.log(this.rForm)
      } else if (this.rForm.valid == false || this.servForm.valid == false){
        jQuery('#btn-crear').prop('disabled',true);
        //console.log(this.rForm)
      }
    } else {
      if(this.rForm.valid == true) {
        jQuery('#btn-crear').prop('disabled',false);
      } else if (this.rForm.valid == false){
        jQuery('#btn-crear').prop('disabled',true);
      }
    }
  }

  validation2(){
    if(this.rForm.valid == true && this.tipoUsuario == '1' && this.servForm.valid == true && (this.tvForm.valid == true || this.intForm.valid == true)
        && (this.servForm.value.tvCtrl == true || this.servForm.value.intCtrl == true)){
      jQuery('#btn-crear').prop('disabled',false);
      console.log('internet o tv valido')
    } else if ( this.servForm.valid == false || this.rForm.valid == false || this.tvForm.valid == false || this.intForm.valid == false){
      jQuery('#btn-crear').prop('disabled',true);
      console.log('internet o tv no valido')
    } 
  }

  validation3(){
    if (this.servForm.value.tvCtrl == true){
      if(this.tvForm.valid == true && this.servForm.valid == true && this.rForm.valid == true){
        jQuery('#btn-crear').prop('disabled',false);
        console.log('tv valido')
      } else if (this.tvForm.valid == false || this.servForm.valid == false || this.rForm.valid == false) {
        jQuery('#btn-crear').prop('disabled',true);
        console.log('tv no valido')
      }
    }
  }

  validation4(){
    if (this.servForm.value.intCtrl == true){
      if(this.intForm.valid == true && this.servForm.valid == true && this.rForm.valid == true){
        console.log('internet valido')
        jQuery('#btn-crear').prop('disabled',false);
      } else if (this.intForm.valid == false || this.servForm.valid == false || this.rForm.valid == false) {
        jQuery('#btn-crear').prop('disabled',true);
        console.log('internet no valido')
      }
    }
  }

  checkChange() {
    console.log(this.servForm);
    setTimeout(() => jQuery('.collapsible').collapsible(), 1000);
    if (this.servForm.value.tvCtrl == true){
      this.tv = 1;
    } else {
      this.tv = 0;
    }
  }

  checkChange2() {
    console.log('facturacion change');
    setTimeout(() => jQuery('.collapsible').collapsible(), 1000);
    if (this.servForm.value.intCtrl == true){
      this.int = 1;
      console.log(this.int)
    } else {
      this.int = 0;
      console.log(this.int)
    }
  }

  openModalPagos(){
    let ban = 0;
    this._paymentservice.getInfoFac(this.subsEdit.id).subscribe(data => {
      this.facts = data.detalle_facturas;
      this.pdocuments = data.conceptos;
      this.formaspago = data.formas_pago;
      this.bancos = data.bancos;
      this.cobradores = data.cobradores;
      this.total = {'valor': data.valor_total};
      this.totalAplicado = this.total.valor;
      console.log(this.facts);
      for (let i=0; i < this.facts.length; i++) {
        this.facts[i]['abono'] = this.facts[i]['saldo']
      }
    })

    jQuery('#modal-pagos').modal('open');
  }

  createPayment(descuento, obserpago){
    if (descuento) {
      this._paymentservice.createPayment({ "entidad_id": this.subsEdit.id,
      "documento_id": this.createDoc,
      "fechatrn": this.model9,
      "valor": this.total.valor,
      "observacion": obserpago,
      "forma_pago_id": this.createPay, 
      "banco_id": this.createBank, 
      "cobrador_id": this.createDebt,
      "detalle":  this.detalles ,
     'db': localStorage.getItem('db'), 'usuario_id': localStorage.getItem('usuario_id') }).subscribe(
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

  changeData () {
    console.log('cambio');
    this.totalAplicado = 0;
    this.diferencia = 0;
    this.pagado = 0;
    this.pagado = Number(this.total.valor);
    console.log("Pagado" + this.pagado)
    for (let i = 0; i < this.facts.length; i++) {
      console.log(this.facts[i]['saldo'])
      if (this.pagado > this.facts[i]['saldo']){
        this.facts[i]['abono'] = this.facts[i]['saldo'];
      } else {
        this.facts[i]['abono'] = this.pagado;
      }
      this.facts[i]['total'] = this.facts[i]['saldo'] - this.facts[i]['abono'];
      this.totalAplicado = Number(this.totalAplicado) + Number(this.facts[i]['abono']);
      this.pagado = this.pagado - this.facts[i]['abono']; 
      this.detalles[i] = {"nrodcto": this.facts[i]['nrodcto'], "concepto_id": this.facts[i]['concepto'], "saldo": this.facts[i]['saldo'],
      "abono": this.facts[i]['abono'], "total": this.facts[i]['total']} 
      console.log("Aplicado" + this.totalAplicado)
    }
    this.diferencia =  Number(this.total.valor) - Number(this.totalAplicado);
    console.log("Diferencia" + this.diferencia)
    this.totalAplicar = Number(this.diferencia); 
  }

  changeAbono(){
    this.totalAplicado = 0;
    this.diferencia = 0;
    for (let i = 0; i < this.facts.length; i++) {
      this.facts[i]['total'] = (Number(this.facts[i]['saldo']) - Number(this.facts[i]['abono']));
      this.detalles[i] = {"nrodcto": this.facts[i]['nrodcto'], "concepto_id": this.facts[i]['concepto'], "saldo": this.facts[i]['saldo'],
      "abono": Number(this.facts[i]['abono']), "total": this.facts[i]['total']} 
      this.totalAplicado = Number(this.totalAplicado) + Number(this.facts[i]['abono']);
    }
    this.diferencia = Number(this.total.valor) - Number(this.totalAplicado);
    this.totalAplicar = Number(this.diferencia); 
  }

  openModalAnular(){
    this._suscriberservice.getBills(this.subsEdit.id).subscribe(data => {
      this.facts = data.detalle_facturas;
    })
    jQuery('#modal-anular').modal('open');
  }

  anularFactura() {
    swal({
      title: '¿Desea anular la factura?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.subsEdit) {
          console.log(this.subsEdit.id, this.nroDoc)
          this._suscriberservice.cancelBills({'entidad_id':this.subsEdit.id, 'nrodcto': this.nroDoc}).subscribe(
            data => {
              if ( data.status == "anulada") {
                swal({
                  title: 'Factura anulada con éxito',
                  text: '',
                  type: 'success',
                  onClose: function reload() {
                            location.reload();
                          }
                })
              } else if ( data.error = "no se anulo factura" ) {
                swal(
                  'No se pudo anular la factura',
                  '',
                  'warning'
                )
              }
            },
            error =>{
              swal(
                'No se pudo anular la factura',
                '',
                'warning'
              )
            })
        } 
      }
    })
  }
  
  selectData(subs){
    this.subsEdit = subs;
  }

  selectFac(fac){
    console.log(fac)
    this.nroDoc = fac.nrodcto;
  }

  downloadPDF(){
    this._suscriberservice.downloadSubscriber().subscribe(data => {
      this.listado = data.senales;
      for(let i = 0; i < 5 ; i++){
        this.rows[i] = {"contrato": this.listado[i]['contrato'], "codigo": this.listado[i]['codigo'], "documento": this.listado[i]['documento'],
                        "nombres": this.listado[i]['nombres'], "direccion": this.listado[i]['direccion'], "barrio": this.listado[i]['barrio'],
                        "zona": this.listado[i]['zona'], "tel1": this.listado[i]['telefono1'], "fechacon": this.listado[i]['fechacontrato'],
                        "precinto": this.listado[i]['precinto'], "estado_tv": this.listado[i]['plantilla_fact_tv'][0]['estado_tv'],
                        "saldo_tv": this.listado[i]['plantilla_fact_tv'][1]['saldo_tv']}
      }
    });
    var rows1 = [
      {"id": 1, "name": "Shaw", "country": "Tanzania"},
      {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
      {"id": 3, "name": "Garcia", "country": "Madagascar"},
    ];
    var doc = new jsPDF('p', 'pt');
    //doc.autoTable(this.columns, this.rows);
    doc.save('table.pdf');
    console.log(rows1)
    console.log(this.rows)
  } 

  exportToExcel(event){
    this._suscriberservice.downloadSubscriber().subscribe(data => {
      this.excelService.exportAsExcelFile(data.senales, 'Suscriptores');
    });
  }

  llenarTarifas(val) {
    let j = 0;
    for (let i=0; i < this.ratestv.length ; i++) {
      if (val == this.ratestv[i]['plan_id']) {
        this.ratestvSelect[j] =  this.ratestv[i];
        j++;
      }
    }
  }

  llenarTarifasInt(val) {
    let j = 0;
      for (let i=0; i < this.ratesint.length ; i++) {
        if( val == this.ratesint[i]['plan_id']){
          this.ratesintSelect[j] =  this.ratesint[i];
          j++;
        }
      }
  }

  openModal (subscriber) {
    console.log(subscriber)
    this.disabled = true;
    this.splitted = 0; this.splitted2 = 0; this.splitted3 = 0;
    this.subsEdit = subscriber;
    if(this.subsEdit.fechacontrato != null){
      let str = this.subsEdit.fechacontrato;
      this.splitted = str.split("/", 3);
      for (let i = 0; i < 10; i++) {
        if (this.splitted[0] == "0" + i.toString()) {      
        }
        if (this.splitted[1] == "0" + i.toString()) {
          this.splitted[1] = i.toString();        
        }
      }
      this.model = { date: { year: this.splitted[2], month: this.splitted[1], day: this.splitted[0] } };
    }
    if(this.subsEdit.fechanac != null) {
      let str2 = this.subsEdit.fechanac;
      this.splitted2 = str2.split("/", 3); 
      for (let i = 0; i < 10; i++) {
        if (this.splitted2[0] == "0" + i.toString()) {
          this.splitted2[0] = i.toString();      
        }
        if (this.splitted2[1] == "0" + i.toString() ) {
          this.splitted2[1] = i.toString();     
        }
      }
      this.model2 = { date: { year: this.splitted2[2], month: this.splitted2[1], day: this.splitted2[0] } };
    }
    if (this.subsEdit.fecha_ult_pago != null){
      let str3 = this.subsEdit.fecha_ult_pago; 
      this.splitted3 = str3.split("/", 3);
      for (let i = 0; i < 10; i++) {
        if (this.splitted3[0] == "0" + i.toString()) {
          this.splitted3[0] = i.toString();        
        }
        if (this.splitted3[1] == "0" + i.toString() ) {
          this.splitted3[1] = i.toString();        
        }
      }
    this.model8 = { date: { year: this.splitted3[2], month: this.splitted3[1], day: this.splitted3[0] } };       
    }
    /* for (let i = 0; i < 10; i++) {
      if (this.splitted[0] == "0" + i.toString() || this.splitted2[0] == "0" + i.toString() || this.splitted3[0] == "0" + i.toString()) {
        this.splitted[0] = i.toString();
        this.splitted2[0] = i.toString();
        this.splitted3[0] = i.toString();        
      }
      if (this.splitted[1] == "0" + i.toString() || this.splitted2[1] == "0" + i.toString() || this.splitted3[1] == "0" + i.toString() ) {
        this.splitted[1] = i.toString();
        this.splitted2[1] = i.toString();
        this.splitted3[1] = i.toString();        
      }
    } */
    
     
    let j = 0;
    for (let i=0; i < this.ratestv.length ; i++) {
      if( this.subsEdit.plan_tv == this.ratestv[i]['plan_id']){
        this.ratestvEdit[j] =  this.ratestv[i];
        j++;
      }
    }
    let k = 0;
    for (let i=0; i < this.ratesint.length ; i++) {
      if( this.subsEdit.tarifa_int == this.ratesint[i]['valor']){
        this.ratesintEdit[k] =  this.ratesint[i];
        k++;
      }
    }
    if (this.subsEdit.tv == '1'){
      this.tvEdit = 1;
    } else if (this.subsEdit.tv =='0'){
      this.tvEdit = 0;
      for (let i=0; i < this.ratestv.length ; i++) {
          this.ratestvEdit[i] =  ' ';
      }
    }
    if (this.subsEdit.internet == '1') {
      this.intEdit = 1;
    } else if (this.subsEdit.internet == '0') {
      this.intEdit = 0;
    }
    jQuery('#modal-see').modal('open');

    if(this.subsEdit.funcion == 'Suscriptor') {
      jQuery('#ciudadEdit').prop('disabled',true);
    }

    setTimeout(() => jQuery('.collapsible').collapsible(), 1000);

    if (this.subsEdit.equipo == 'S') {
      this.equipo = 'Si';
    } else if (this.subsEdit.equipo  == 'N') {
      this.equipo = 'No';
    }
    for (let i = 0; i < this.functions.length; i++) {
      if ( subscriber.funcion == this.functions[i]['id']) {
        this.funEdit = this.functions[i]['nombre'];
      }
    }
  }

  changeTypeCreate () {
    console.log('entro')
    
  }

  changeType() {
    jQuery('#televisionEdit').on('change', () => {
      if (jQuery('#televisionEdit').prop('checked') == true){
        this.tvEdit = 1;
        this.subsEdit.tv = '1';
        setTimeout(() => jQuery('.collapsible').collapsible(), 1000);
      } else {
        this.tvEdit = 0;
        this.subsEdit.tv = '0';
      }
    });
    jQuery('#internetEdit').on('change', () => {
      if (jQuery('#internetEdit').prop('checked') == true){
        this.intEdit = 1;
        this.subsEdit.internet = '1';
        setTimeout(() => jQuery('.collapsible').collapsible(), 1000);
        console.log("checked")
      } else {
        this.intEdit = 0;
        this.subsEdit.internet = '0';
        console.log('Not checked')
      }
    });
  }

  updateSubs() {
    if(this.subsEdit){
      console.log(this.model.formatted)
      this._suscriberservice.updateSubscribers({
        "senal": 
            {
                "contrato": this.subsEdit.contrato,
                "direccion": this.subsEdit.contrato,
                "urbanizacion": this.subsEdit.urbanizacion,
                "torre": this.subsEdit.torre,
                "apto": this.subsEdit.apto,
                "barrio_id": this.barriotvEdit,
                "zona_id": this.zonatvEdit,
                "telefono1": this.subsEdit.telefono1,
                "telefono2": this.subsEdit.telefono2,
                "contacto": this.subsEdit.contacto,
                "estrato": this.estratotv,
                "vivienda": this.tipoviviendatvEdit,
                "observacion": this.subsEdit.observacion,
                "fechacontrato": this.model.formatted,
                "permanencia": this.permanenciaEdit,
                "televisores": this.subsEdit.televisores,
                "decos": Number(this.subsEdit.decos),
                "precinto": this.subsEdit.precinto,
                "vendedor_id": this.vendedortvEdit,
                "tipo_instalacion_id": this.tipoinstalaciontvEdit,
                "tecnologia_id": this.tipotecnologiatvEdit,
                "tiposervicio": this.tiposerviciotvEdit,
                "areainstalacion": this.areainstalaciontvEdit,
                "tipo_facturacion_id": this.tipofacturaciontvEdit,
                "usuario_id": localStorage.getItem('usuario_id')
            },
        "persona": 
            {
                "tipo_documento_id": this.tipodocEdit,
                "documento": this.subsEdit.documento,
                "nombre1": this.subsEdit.nombre1,
                "nombre2": this.subsEdit.nombre2,
                "apellido1": this.subsEdit.apellido1,
                "apellido2": this.subsEdit.apellido2,
                "direccion": this.subsEdit.direccionP,
                "barrio_id": this.barrioEdit,
                "zona_id": this.zonaEdit,
                "telefono1": this.subsEdit.telefono1P,
                "telefono2": this.subsEdit.telefono2P,
                "correo": this.subsEdit.correo,
                "fechanac": this.model2.formatted,
                "tipopersona": this.tipopersonaEdit,
                "estrato": this.estratoEdit,
                "condicionfisica": this.condicionEdit,
                "usuario_id": localStorage.getItem('usuario_id')
            },
        "info_internet": 
            {
                "direccionip": this.subsEdit.direccionip,
                "velocidad": this.subsEdit.velocidad,
                "mac1": this.subsEdit.mac1,
                "mac2": this.subsEdit.mac2,
                "serialm": this.subsEdit.serialm,
                "marcam": this.subsEdit.marcam,
                "mascarasub": this.subsEdit.mascarasub,
                "dns": this.subsEdit.dns,
                "gateway": this.subsEdit.gateway,
                "nodo": this.subsEdit.nodo,
                "clavewifi": this.subsEdit.clavewifi,
                "equipo": this.equipoEdit,
                "usuario_id":  localStorage.getItem('usuario_id')
            },
        "funcion_id": this.funcionEdit,
        "tarifa_id_tv": this.tarifastvEdit,
        "internet": Number(this.intEdit),
        "tv": Number(this.tvEdit),
        "tarifa_id_int": this.tarifasintEdit,
        "tecnico_id": this.tecnicoEdit,
        "db": localStorage.getItem('db'),
        "id": this.subsEdit.id
    }).subscribe(
        data => {
          console.log(data)
          if ( data.message1 == "actualizado servicio tv" || data.message2 == "actualizado servicio internet") {
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
        error =>{
          swal(
            'No se pudo eliminar el registro',
            '',
            'warning'
          )
        }
      )
    }
  }

  onDateChanged(event: IMyDateModel) {
    this.model3 = event.formatted ;
  }

  elaboDate(event: IMyDateModel) {
    this.model5 = event.formatted ;
  }

  inicioPeriodo(event: IMyDateModel) {
    this.model6 = event.formatted ;
  }

  finPeriodo(event: IMyDateModel) {
    this.model7 = event.formatted ;
  }

  onDateChangedServ(event: IMyDateModel) {
    console.log(event.formatted )
    this.model4 = event.formatted ;
  }

  onDateDoc(event: IMyDateModel) {
    console.log(event.formatted )
    this.model9 = event.formatted ;
  }

  createSubs(post, city, serv, tv, int){
      if (post) {
      this._suscriberservice.createSubscribers({
        "persona":
         {
             "tipo_documento_id": post.tipofuncion,
             "documento": post.numdoc,
             "nombre1": post.nombre1,
             "nombre2": post.nombre2,
             "apellido2": post.apellido2,
             "apellido1": post.nombre2,
             "direccion": post.direccion,
             "barrio_id": post.barrio,
             "zona_id": post.barrio,
             "telefono1": post.tel1,
             "telefono2": post.tel2,
             "correo": post.correo,
             "fechanac": this.model3, 
             "tipopersona": post.tipopersona,
             "estrato": post.estrato,
             "condicionfisica": post.condicionfisica,
             "ciudad_id": city.ciudad,
             "usuario_id": localStorage.getItem('usuario_id')
         },
        "senal":{
            "contrato": serv.numcontrato,
            "direccion": serv.direccion,
            "urbanizacion": serv.urbanizacion,
            "torre": serv.torre,
            "apto": serv.apartamento,
            "barrio_id": serv.barrio,
            "zona_id": serv.zona,
            "telefono1": serv.tel1,
            "telefono2": serv.tel2,
            "contacto": serv.contacto,
            "estrato": serv.estrato,
            "vivienda": serv.tipovivienda,
            "observacion": serv.observacion,
            "fechacontrato": this.model4,
            "permanencia": tv.permanencia,
            "televisores": tv.televisores,
            "decos": tv.decos,
            "precinto": tv.precinto,
            "vendedor_id": serv.vendedor,
            "tipo_instalacion_id": serv.tipoinstalacion,
            "tecnologia_id": serv.tipotecnologia,
            "tiposervicio": serv.tiposervicio,
            "areainstalacion": serv.areainstalacion,
            "tipo_facturacion_id": serv.tipofacturacion,
            "usuario_id": localStorage.getItem('usuario_id')
        },
        "info_internet": 
            {
                "direccionip": int.dirip,
                "velocidad": int.velocidad,
                "mac1": int.mac1,
                "mac2": int.mac2,
                "serialm": int.serial,
                "marcam": int.marcamodem,
                "mascarasub": int.mascara,
                "dns": int.dns,
                "gateway": int.gateway,
                "nodo": int.nodo,
                "clavewifi": int.clave,
                "equipo": int.equipo,
                "usuario_id": localStorage.getItem('usuario_id')
            },
        "funcion_id": post.tipofuncion,
        "tv": Number(this.tv),
        "valorafi_tv": Number(tv.valorafitv),
        "valor_dcto_tv": Number(tv.descuento),
        "tarifa_id_tv": tv.tarifastv,
        "internet": Number(this.int),
        "valorafi_int": Number(int.valorafiint),
        "valor_dcto_int": Number(int.descuento),
        "tarifa_id_int": int.tarifasint,
        "tecnico_id": serv.tecnico, 
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

  /* createSubs(numdoc, nombre1, nombre2, apellido1, apellido2, tel1, tel2, direccion, correo, 
    contratos, direccions, urbanizacions, torres, apartamentos, tel1s, tel2s, contactos, observacions, 
    televisores, decos, precinto, descuento, dirip, velocidad, mac1, mac2, serial, marcamodem, mascara, dns, gateway, nodo, clave, descuentoint){
      console.log(direccion)
      if (numdoc) {
      this._suscriberservice.createSubscribers({
        "persona":
         {
             "tipo_documento_id": this.createTypedoc,
             "documento": numdoc,
             "nombre1": nombre1,
             "nombre2": nombre2,
             "apellido2": apellido2,
             "apellido1": apellido1,
             "direccion": direccion,
             "barrio_id": this.createNeigh,
             "zona_id": this.createZone,
             "telefono1": tel1,
             "telefono2": tel2,
             "correo": correo,
             "fechanac": this.model3, 
             "tipopersona": this.createPer,
             "estrato": this.createStrat,
             "condicionfisica": this.createCond,
             "usuario_id": localStorage.getItem('usuario_id')
         },
        "senal":{
            "contrato": contratos,
            "direccion": direccions,
            "urbanizacion": urbanizacions,
            "torre": torres,
            "apto": apartamentos,
            "barrio_id": this.createNeightv,
            "zona_id": this.createZonetv,
            "telefono1": tel1s,
            "telefono2": tel2s,
            "contacto": contactos,
            "estrato": this.createStrattv,
            "vivienda": this.createTypevivtv,
            "observacion": observacions,
            "fechacontrato": this.model4,
            "permanencia": this.createPerm,
            "televisores": televisores,
            "decos": decos,
            "precinto": precinto,
            "vendedor_id": this.createSeller,
            "tipo_instalacion_id": this.createTypeinst,
            "tecnologia_id": this.createTypetech,
            "tiposervicio": this.createTypeserv,
            "areainstalacion": this.createAreainst,
            "tipo_facturacion_id": this.createTypefac,
            "usuario_id": localStorage.getItem('usuario_id')
        },
        "info_internet": 
            {
                "direccionip": dirip,
                "velocidad": 3,
                "mac1": mac1,
                "mac2": mac2,
                "serialm": serial,
                "marcam": marcamodem,
                "mascarasub": mascara,
                "dns": dns,
                "gateway": gateway,
                "nodo": nodo,
                "clavewifi": clave,
                "equipo": this.createEquip,
                "usuario_id": localStorage.getItem('usuario_id')
            },
        "funcion_id": this.createFunc,
        "tv": Number(this.tv),
        "valorafi_tv": Number(this.valorafitv),
        "valor_dcto_tv": Number(descuento),
        "tarifa_id_tv": this.createRatetv,
        "internet": Number(this.int),
        "valorafi_int": Number(this.valorafiint),
        "valor_dcto_int": Number(descuentoint),
        "tarifa_id_int": this.createRateint,
        "tecnico_id": this.createTech,
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
          } else {
            swal(
              'No se pudo crear el registro',
              '',
              'warning'
            )
          }
        });
    } 
  }  */

  createBill(post) {
    if (post) {
      this._suscriberservice.createBills({
        "tipo_facturacion_id": Number(post.tipofac),
        "servicio_id": Number(post.facturade),
        "f_elaboracion": this.model5,
        "f_inicio": this.model6,
        "f_fin": this.model7,
        "entidad_id": this.subsEdit.id,
        "valor": Number(post.valor),
        "observa": post.observaciones,
        "usuario_id": localStorage.getItem('usuario_id'),
        "db": localStorage.getItem('db')
    }).subscribe(
        data => {
          console.log(data)
          if (data.status == "created") {
            swal({
              title: 'Factura creada con éxito',
              text: '',
              type: 'success',
              onClose: function reload() {
                        location.reload();
                      }
            })
          } else if (data.error == "no se pudo crear"){
            swal(
              'No se generó la factura',
              '',
              'warning'
            )
          } else if (data.error == "mes diferente al corriente"){
            swal(
              'No se puede realizar una factura en un mes diferente al corriente',
              '',
              'warning'
            )
          } else if (data.error == "ya tiene factura en el mes corriente"){
            swal(
              'El suscriptor ya tiene una factura en el mes corriente',
              '',
              'warning'
            )
          }
        });
    } 
  }

  deleteSubs(){
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
        if (this.subsEdit) {
          console.log(this.subsEdit.id)
          this._suscriberservice.deleteSubscribers(this.subsEdit.id).subscribe(
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
              } else if ( data.error = "El suscriptor no se puede eliminar" ) {
                swal(
                  'No se pudo eliminar el registro',
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
      document.getElementById('btn-options').setAttribute('style', 'visibility: visible');
      console.log(cantidad.length)
      for(var i = 0; i < cantidad.length; i++ ) {
        check[i].checked = true;
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      }
    } else {
      document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: hidden');
      document.getElementById('btn-options').setAttribute('style', 'visibility: hidden');
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
      document.getElementById('btn-options').setAttribute('style', 'visibility: hidden');
      this.toogleDelete = false;
    }
    
    for(var i = 0; i < cantidad.length; i++ ){
      if(check[i].checked){
        console.log('false');
        this.toogleDelete = true;
        document.getElementById('btn-footer-delete').setAttribute('style', 'visibility: visible');
        document.getElementById('btn-options').setAttribute('style', 'visibility: visible');
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  selectRowFac() {
    var rows = <HTMLInputElement><any>document.getElementsByName('rows_fac');
    var check = <HTMLInputElement><any>document.getElementsByName('group5');
    var cantidad = document.getElementsByName('group5');
    console.log(rows)
    
    for(var i = 0; i < cantidad.length; i++ ){
      console.log('row');
      if(check[i].checked){
        rows[i].setAttribute("style", "background-color : #9ad1ea");
      } else {
        rows[i].setAttribute("style", "background-color : none");
      }
    }    
  }

  edit() {
    jQuery("input:disabled").prop('disabled',false);
    jQuery('.not-disabled').prop('disabled', true);
    jQuery("select:disabled").prop('disabled',false);
    this.disabled = false;
    jQuery('#funcionEdit').on('change', () => {
      this.tipoUsuarioEdit = jQuery('#funcionEdit').val();
      if ( this.tipoUsuarioEdit == '1') {
        jQuery('#ciudadEdit').prop('disabled',true);
      } else if ( this.tipoUsuarioEdit != '1') {
        jQuery('#ciudadEdit').prop('disabled',false);
      }
    });
    this.changeType();
    jQuery('#internetEdit').on('change', () => {
      if (jQuery('#internetEdit').prop('checked') == true) {
        console.log('change')
        setTimeout(() => jQuery(".select-disabled").prop('disabled',false), 1000);
      }
    })
    if(this.subsEdit.funcion == 1) {
      jQuery('#ciudadEdit').prop('disabled',true);
    }
    jQuery('.select-city').children('option[value="nodisplay"]').css('display','none');
    jQuery('.collapsible').collapsible();
    jQuery('#barriotvEdit').on('change', () => {
      this.barriotvEdit = jQuery('#barriotvEdit').val();
    });
    jQuery('#zonatvEdit').on('change', () => {
      this.zonatvEdit = jQuery('#zonatvEdit').val();
    });
    jQuery('#estratotvEdit').on('change', () => {
      this.estratotv = jQuery('#estratotvEdit').val();
    });
    jQuery('#tipoviviendatvEdit').on('change', () => {
      this.tipoviviendatvEdit = jQuery('#tipoviviendatvEdit').val();
    });
    jQuery('#permanenciaEdit').on('change', () => {
      this.permanenciaEdit = jQuery('#permanenciaEdit').val();
    });
    jQuery('#vendedortvEdit').on('change', () => {
      this.vendedortvEdit = jQuery('#vendedortvEdit').val();
    });
    jQuery('#tipoinstalaciontvEdit').on('change', () => {
      this.tipoinstalaciontvEdit = jQuery('#tipoinstalaciontvEdit').val();
    });
    jQuery('#tipotecnologiatvEdit').on('change', () => {
      this.tipotecnologiatvEdit = jQuery('#tipotecnologiatvEdit').val();
    });
    jQuery('#tiposerviciotvEdit').on('change', () => {
      this.tiposerviciotvEdit = jQuery('#tiposerviciotvEdit').val();
    });
    jQuery('#areainstalaciontvEdit').on('change', () => {
      this.areainstalaciontvEdit = jQuery('#areainstalaciontvEdit').val();
    });
    jQuery('#areainstalaciontvEdit').on('change', () => {
      this.areainstalaciontvEdit = jQuery('#areainstalaciontvEdit').val();
    });
    jQuery('#barrioEdit').on('change', () => {
      this.barrioEdit = jQuery('#barrioEdit').val();
    });
    jQuery('#zonaEdit').on('change', () => {
      this.zonaEdit = jQuery('#zonaEdit').val();
    });
    jQuery('#tipopersonaEdit').on('change', () => {
      this.tipopersonaEdit = jQuery('#tipopersonaEdit').val();
    });
    jQuery('#estratoEdit').on('change', () => {
      this.estratoEdit = jQuery('#estratoEdit').val();
    });
    jQuery('#condicionEdit').on('change', () => {
      this.condicionEdit = jQuery('#condicionEdit').val();
    });
    jQuery('#equipoEdit').on('change', () => {
      this.equipoEdit = jQuery('#equipoEdit').val();
    });
    jQuery('#funcionEdit').on('change', () => {
      this.funcionEdit = jQuery('#funcionEdit').val();
    });
    jQuery('#tarifastvEdit').on('change', () => {
      this.tarifastvEdit = jQuery('#tarifastvEdit').val();
    });
    jQuery('#tarifasintEdit').on('change', () => {
      this.tarifasintEdit = jQuery('#tarifasintEdit').val();
    });
    jQuery('#tecnicoEdit').on('change', () => {
      this.tecnicoEdit = jQuery('#tecnicoEdit').val();
    });
    jQuery('#tipodocEdit').on('change', () => {
      this.tipodocEdit = jQuery('#tipodocEdit').val();
    });
    jQuery('#tipofacturaciontvEdit').on('change', () => {
      this.tipofacturaciontvEdit = jQuery('#tipofacturaciontvEdit').val();
    });
  }

}
