import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import swal from 'sweetalert2';
import { ExcelService } from '../services/excel.service';
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
  tipoUsuario:string; services: string; neighborhoods: string; zones: string; tipoUsuarioEdit: string; tipoFactEdit: string; listado: string;
  planstv: string; plansint: string; ratestv: string; typeinst: string; ratesint: string; cities: string; paramafi: string; valorafitv: any; valorafiint: any;
  technologies: string; typedoc: string; functions: string; states: string; equipo: any; template_fact_tv: string; createNeigh: string; createZone: string;
  createPer: string; createStrat: string; createCond: string; createNeightv: string; createZonetv: string; createStrattv: string; createTypevivtv: string;
  createSeller: string; createTech: string; createTypeinst: string; createTypetech: string; createTypeserv: string; createAreainst: string; createTypefac: string;
  createPerm: string; createRatetv: string; createEquip: string; createRateint: string; createFunc: string; tv: any = 1; int: any; createTypedoc: string;
  seller: any; sellers: string; techs: string; entities: string; template: any[] = []; infoint: any[] = []; typedocEdit: any; tipodocEdit: any; estados: any[] = []
  subscribers: any[] = []; subsEdit: any; funEdit: any; neighEdit: any; zoneEdit: any; neighEditP: any; zoneEditP: any; tipofacturaciontvEdit: any;
  viv: any; sellerEdit: any; instEdit: any; serv: any; area: any; tech:any; techEdit: any; plantvEdit: any; ratestvEdit: any[] =[]; ratesintEdit: any[] = []; rows: any[] = [];
  template_fact_int: any; barriotvEdit: any; zonatvEdit: any; estratotv: any; tipoviviendatvEdit: any; permanenciaEdit: any; vendedortvEdit: any; data: any[] = []
  tipoinstalaciontvEdit: any; tipotecnologiatvEdit: any; tiposerviciotvEdit: any; areainstalaciontvEdit: any; barrioEdit: any; zonaEdit: any;
  tipopersonaEdit: any; estratoEdit: any; condicionEdit: any; equipoEdit: any; funcionEdit: any; tarifastvEdit: any; tarifasintEdit: any; tecnicoEdit: any;
  ratestvSelect: any[] = []; ratesintSelect: any[] = [];
  columns: any[] = [ {title: "Contrato", dataKey: "contrato"},
  {title: "Código", dataKey: "codigo"}, 
  {title: "Documento", dataKey: "documento"}, 
  {title: "Nombres", dataKey: "nombres"}, 
  {title: "Dirección", dataKey: "direccion"}, 
  {title: "Barrio", dataKey: "barrio"}, 
  {title: "Zona", dataKey: "zona"}, 
  {title: "Teléfono 1", dataKey: "tel1"}, 
  {title: "Fecha contrato", dataKey: "fechacon"}, 
  {title: "Precinto", dataKey: "precinto"}, 
  {title: "Estado tv", dataKey: "estado_tv"}, 
  {title: "Saldo tv", dataKey: "saldo_tv"}];

  constructor(private _suscriberservice: SubscribersService, private excelService: ExcelService) { 
  }

  ngOnInit() {
    this._suscriberservice.getSubscribers().subscribe(data => {
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
      /*for(let i=0; i < this.subscribers.length; i++ ) {
        if (this.subscribers[i]['tv'] == 1) {
          this.template[i] = this.subscribers[i]['plantilla_fact_tv'][1].saldo_tv;
          this.estados[i] = this.subscribers[i]['plantilla_fact_tv'][0].estado_tv
        } else if (this.subscribers[i]['tv'] == 0) {
          this.template[i] = 0;
        }
      }*/
      if (this.paramafi == 'N') {
        jQuery("#valorinternet").prop('disabled',true);
        jQuery("#valorafiliaciontv").prop('disabled',true);
        this.valorafitv = Number(data.valor_afi_tv);
        console.log(this.valorafitv)
        this.valorafiint = Number(data.valor_afi_int);
      }
    });
    document.getElementById('collapsible-internet').setAttribute('style', 'visibility: hidden');
    jQuery('.collapsible').collapsible();
    jQuery('#modal-crear').modal();
    jQuery('#modal-factura').modal();
    jQuery('#modal-orden').modal()
    jQuery('ul.tabs').tabs();
    jQuery('select').material_select();
    jQuery('.dropdown-button').dropdown();
    jQuery('#modal-see').modal({ complete: function() { 
      jQuery(".select-disabled:enabled").prop('disabled',true);
    }});
    jQuery('#funcion').on('change', () => {
      this.tipoUsuario = jQuery('#funcion').val();
      if ( this.tipoUsuario == '1') {
        jQuery('#ciudad').prop('disabled',true);
      } else if ( this.tipoUsuario != '1') {
        jQuery('#ciudad').prop('disabled',false);
      }
    });
    jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date,
      monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
      weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sáb' ],
      format: 'yyyy-mm-dd'
    });
    jQuery('#television').on('change', () =>{
      var changeTv = <HTMLInputElement><any>document.getElementById('television');
      if(changeTv.checked == true) {
        document.getElementById('collapsible-television').setAttribute('style', 'visibility: visible');
        //jQuery('#collapsible-television').prop('visibility','visible');
      } else {
        //jQuery('#collapsible-television').collapsible('visibility', 'hidden');
        document.getElementById('collapsible-television').setAttribute('style', 'visibility: hidden');
      }
    }); 
    jQuery('#internet').on('change', () =>{
      var changeTv = <HTMLInputElement><any>document.getElementById('internet');
      if(changeTv.checked == true) {
        document.getElementById('collapsible-internet').setAttribute('style', 'visibility: visible');
        //jQuery('#collapsible-internet').collapsible('open', 0);
      } else {
        document.getElementById('collapsible-internet').setAttribute('style', 'visibility: hidden');
        //jQuery('#collapsible-internet').collapsible('close', 0);
      }
    });
    jQuery('#funcion').on('change', () => {
      this.createFunc = jQuery('#funcion').val();
    });
    jQuery('#tipodoc').on('change', () => {
      this.createTypedoc = jQuery('#tipodoc').val();
    });
    jQuery('#barrio').on('change', () => {
      this.createNeigh = jQuery('#barrio').val();
    });
    jQuery('#zona').on('change', () => {
      this.createZone = jQuery('#zona').val();
    });
    jQuery('#tipopersona').on('change', () => {
      this.createPer = jQuery('#tipopersona').val();
    });
    jQuery('#estrato').on('change', () => {
      this.createStrat = jQuery('#estrato').val();
    });
    jQuery('#condicion').on('change', () => {
      this.createCond = jQuery('#condicion').val();
    });
    jQuery('#barriotv').on('change', () => {
      this.createNeightv = jQuery('#barriotv').val();
    });
    jQuery('#zonatv').on('change', () => {
      this.createZonetv = jQuery('#zonatv').val();
    });
    jQuery('#estratotv').on('change', () => {
      this.createStrattv = jQuery('#estratotv').val();
    });
    jQuery('#tipoviviendatv').on('change', () => {
      this.createTypevivtv = jQuery('#tipoviviendatv').val();
    });
    jQuery('#vendedortv').on('change', () => {
      this.createSeller = jQuery('#vendedortv').val();
    });
    jQuery('#tecnicotv').on('change', () => {
      this.createTech = jQuery('#tecnicotv').val();
    });
    jQuery('#tipoinstalaciontv').on('change', () => {
      this.createTypeinst = jQuery('#tipoinstalaciontv').val();
    });
    jQuery('#tipotecnologiatv').on('change', () => {
      this.createTypetech = jQuery('#tipotecnologiatv').val();
    });
    jQuery('#tiposerviciotv').on('change', () => {
      this.createTypeserv = jQuery('#tiposerviciotv').val();
    });
    jQuery('#areainstalaciontv').on('change', () => {
      this.createAreainst = jQuery('#areainstalaciontv').val();
    });
    jQuery('#tipofacturacion').on('change', () => {
      this.createTypefac = jQuery('#tipofacturacion').val();
    });
    jQuery('#permanencia').on('change', () => {
      this.createPerm = jQuery('#permanencia').val();
    });
    jQuery('#tarifastv').on('change', () => {
      this.createRatetv = jQuery('#tarifastv').val();
    });
    jQuery('#equipo').on('change', () => {
      this.createEquip = jQuery('#equipo').val();
    });
    jQuery('#tarifasinternet').on('change', () => {
      this.createRateint = jQuery('#tarifasinternet').val();
    });
    jQuery('#television').on('change', () => {
      console.log(jQuery('#television').prop('checked'))
      if (jQuery('#television').prop('checked') == true){
        this.tv = 1;
        console.log(this.tv)
      } else {
        this.tv = 0;
      }
    });
    jQuery('#internet').on('change', () => {
      if (jQuery('#internet').prop('checked') == true){
        console.log('int=1')
        this.int = 1;
      } else {
        this.int = 0;
      }
    });
    jQuery('#planestv').on('change', () => {
      let j = 0;
      for (let i=0; i < this.ratestv.length ; i++) {
        if( jQuery('#planestv').val() == this.ratestv[i]['plan_id']){
          this.ratestvSelect[j] =  this.ratestv[i];
          j++;
        }
      }
      console.log(this.ratestvEdit);
    });
    jQuery('#planesinternet').on('change', () => {
      let j = 0;
      for (let i=0; i < this.ratesint.length ; i++) {
        if( jQuery('#planesinternet').val() == this.ratesint[i]['plan_id']){
          this.ratesintSelect[j] =  this.ratesint[i];
          j++;
        }
      }
      console.log(this.ratesintEdit);
    });
  }
  
  selectData(subs){
    this.subsEdit = subs;
    if (this.subsEdit.int == 1) {
      console.log('Internet')
      this.template_fact_int = this.subsEdit['info_internet'][0].plantilla_fact_int;
      let k = 0;
      for (let i=0; i < this.ratestv.length ; i++) {
        if( this.template_fact_int[0]['plan_int'] == this.ratestv[i]['plan']){
          this.ratesintEdit[k] =  this.ratestv[i];
          k++;
        }
      }
    } else if (this.subsEdit.int == 0) {
      console.log('No internet')
      this.subsEdit['info_internet'][0] = '0';
      console.log(subs)
      this.ratesint = '0';
      this.template_fact_int= '0';
    } 
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
    doc.autoTable(this.columns, this.rows);
    doc.save('table.pdf');
    console.log(rows1)
    console.log(this.rows)
  } 

  exportToExcel(event){
    this._suscriberservice.downloadSubscriber().subscribe(data => {
      this.listado = data.senales;
      for(let i = 0; i < 5 ; i++){
        this.rows[i] = {contrato: this.listado[i]['contrato'], codigo: this.listado[i]['codigo'], documento: this.listado[i]['documento'],
                        nombres: this.listado[i]['nombres'], direccion: this.listado[i]['direccion'], barrio: this.listado[i]['barrio'],
                        zona: this.listado[i]['zona'], tel1: this.listado[i]['telefono1'], fechacon: this.listado[i]['fechacontrato'],
                        precinto: this.listado[i]['precinto'], estado_tv: this.listado[i]['plantilla_fact_tv'][0]['estado_tv'],
                        saldo_tv: this.listado[i]['plantilla_fact_tv'][1]['saldo_tv']}
      }
    });
      /*this.data = [   {
        id: 1,
        name: 'Thomas',
        surname: 'Novicky',
        age: 21
    },
    {
        id: 2,
        name: 'Adam',
        surname: 'Tracz',
        age: 12
    },
    {
        id: 3,
        name: 'Steve',
        surname: 'Laski',
        age: 38
    }]*/
    this.data = [ this.rows ];
    console.log(this.rows)
    console.log(this.data)
    this.excelService.exportAsExcelFile(this.data, 'Suscriptores');
  }

  openModal (subscriber) {
    this.subsEdit = subscriber;
    if (this.subsEdit.tv == '1'){
      jQuery('#coltv').addClass('active');
      jQuery('#televisionEdit').prop('checked', true);
      //document.getElementById('collapsible-televisionEdit').setAttribute('style', 'visibility: visible');
      let j = 0;
      for (let i=0; i < this.ratestv.length ; i++) {
        if( this.subsEdit.plan_tv == this.ratestv[i]['plan']){
          this.ratestvEdit[j] =  this.ratestv[i];
          j++;
        }
      }
    } else if (this.subsEdit.tv =='0'){
      jQuery('#coltv').removeClass('active');
      //document.getElementById('collapsible-televisionEdit').setAttribute('style', 'visibility: hidden');
      jQuery('#televisionEdit').prop('checked', false);
      this.subsEdit['plantilla_fact_tv'][0] = '0';
      for (let i=0; i < this.ratestv.length ; i++) {
          this.ratestvEdit[i] =  ' ';
      }
    }
    if (this.subsEdit.internet == '1') {
      jQuery('#colint').addClass('active');
      jQuery('#internetEdit').prop('checked', true);
      //document.getElementById('collapsible-internetEdit').setAttribute('style', 'visibility: visible');
      console.log('Internet')
      let k = 0;
      for (let i=0; i < this.ratestv.length ; i++) {
        if( this.subsEdit.tarifa_int == this.ratesint[i]['valor']){
          this.ratesintEdit[k] =  this.ratesint[i];
          k++;
        }
      }
    } else if (this.subsEdit.internet == '0') {
      console.log('No internet')
      jQuery('#colint').removeClass('active');
      //document.getElementById('collapsible-internetEdit').setAttribute('style', 'visibility: hidden');
      jQuery('#internetEdit').prop('checked', false);
      this.ratesint = '0';
      for (let i=0; i < this.ratestv.length ; i++) {
          this.ratesintEdit[i] =  '0';
      }
    } 
    jQuery('#modal-see').modal('open');
    jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date,
      monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
      weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sáb' ],
      format: 'yyyy-mm-dd'
    });
    //this.seller = this.subsEdit['vendedor'][0];

    if(this.subsEdit.funcion == 'Suscriptor') {
      jQuery('#ciudadEdit').prop('disabled',true);
    }

    jQuery('.collapsible').collapsible();
    //Borrar
    /*if (subscriber.vivienda == 'P') {
      this.viv = 'Propia';
    } else if (subscriber.condicion_fisica == 'A') {
      this.viv = 'Alquilada';
      if (subscriber.tiposervicio == 'R') {
        this.serv = 'Residencial';
      } else if (subscriber.condicion_fisica == 'C') {
        this.serv = 'Comercial';
      }
      if (subscriber.areainstalacion == 'R') {
        this.area = 'Rural';
      } else if (subscriber.areainstalacion == 'U') {
        this.area = 'Urbana';
      } else if (subscriber.areainstalacion == 'E'){
        this.area = 'Extrarural';
      }
    }*/
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
    //Borrar
    /*for (let i = 0; i < this.typedoc.length; i++) {
      if ( subscriber.tipo_documento == this.typedoc[i]['nombre']) {
        this.typedocEdit = this.typedoc[i]['nombre'];
      }
    }
    
    for (let i = 0; i < this.neighborhoods.length; i++) {
      if ( subscriber.barrioP == this.neighborhoods[i]['nombre']) {
        this.neighEditP = this.neighborhoods[i]['nombre'];
      }
      if ( subscriber.barrio == this.neighborhoods[i]['nombre']) {
        this.neighEditP = this.neighborhoods[i]['nombre'];
      }
    }
    for (let i = 0; i < this.zones.length; i++) {
      if ( subscriber.zonaP == this.zones[i]['nombre']) {
        this.zoneEditP = this.zones[i]['nombre'];
      }
      if ( subscriber.zona == this.zones[i]['nombre']) {
        this.zoneEdit = this.zones[i]['nombre'];
      }
      for (let i = 0; i < this.sellers.length; i++) {
        if ( this.seller.nombres == this.sellers[i]['nombres']) {
          this.sellerEdit = this.sellers[i]['nombres'];
          console.log(this.sellerEdit)
        }
      }
      for (let i = 0; i < this.techs.length; i++) {
        if ( this.tech[0]['nombres'] == this.techs[i]['nombres']) {
          this.techEdit = this.techs[i]['nombres'];
          console.log(this.techEdit)
        }
      }
      for (let i = 0; i < this.typeinst.length; i++) {
        if ( subscriber.tipo_instalacion == this.typeinst[i]['nombre']) {
          this.instEdit = this.typeinst[i]['nombre'];
        }
      }
    }*/   
    for (let i = 0; i < this.planstv.length; i++) {
      if ( subscriber.plan_tv == this.planstv[i]['nombre']) {
        this.plantvEdit = this.planstv[i]['nombre'];
      }
    }
  }

  updateSubs() {
    if(this.subsEdit){
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
                "fechacontrato": this.subsEdit.fechacontrato,
                "permanencia": this.permanenciaEdit,
                "televisores": this.subsEdit.televisores,
                "decos": this.subsEdit.decos,
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
                "fechanac": this.subsEdit.fechanac,
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
        "internet": this.subsEdit.int,
        "tv": this.subsEdit.tv,
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

  createSubs(numdoc, nombre1, nombre2, apellido1, apellido2, tel1, tel2, direccion, correo, fechanac, 
            contratos, direccions, urbanizacions, torres, apartamentos, tel1s, tel2s, contactos, observacions, fechacons,
            televisores, decos, precinto, descuento,
            dirip, velocidad, mac1, mac2, serial, marcamodem, mascara, dns, gateway, nodo, clave, valorafiint, descuentoint){
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
             "fechanac": fechanac,
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
             "fechacontrato": fechacons,
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
        "tv": this.tv,
        "valorafi_tv": this.valorafitv,
        "valor_dcto_tv": Number(descuento),
        "tarifa_id_tv": this.createRatetv,
        "internet": this.int,
        "valorafi_int": this.valorafiint,
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
          this._suscriberservice.deleteSubscribers(this.subsEdit.id).subscribe(
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

  edit() {
    jQuery("input:disabled").prop('disabled',false);
    jQuery("select:disabled").prop('disabled',false);
    jQuery('#funcionEdit').on('change', () => {
      this.tipoUsuarioEdit = jQuery('#funcionEdit').val();
      if ( this.tipoUsuarioEdit == '1') {
        jQuery('#ciudadEdit').prop('disabled',true);
      } else if ( this.tipoUsuarioEdit != '1') {
        jQuery('#ciudadEdit').prop('disabled',false);
      }
    });
    if(this.subsEdit.funcion == 1) {
      jQuery('#ciudadEdit').prop('disabled',true);
    }
    jQuery('.select-city').children('option[value="nodisplay"]').css('display','none');
    jQuery('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date,
      monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
      weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sáb' ],
      format: 'yyyy-mm-dd'
    });
    jQuery('.collapsible').collapsible();
    jQuery('#planestvEdit').on('change', () => {
      let j = 0;
      for (let i=0; i < this.ratestv.length ; i++) {
        if( jQuery('#planestvEdit').val() == this.ratestv[i]['plan_id']){
          this.ratestvEdit[j] =  this.ratestv[i];
          j++;
        }
      }
      console.log(this.ratestvEdit);
    });
    jQuery('#planesintEdit').on('change', () => {
      let j = 0;
      for (let i=0; i < this.ratesint.length ; i++) {
        if( jQuery('#planesintEdit').val() == this.ratesint[i]['plan_id']){
          this.ratesintEdit[j] =  this.ratesintEdit[i];
          j++;
        }
      }
      console.log(this.ratesintEdit);
    });
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
