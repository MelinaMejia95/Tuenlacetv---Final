import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }
  arrayData = []

  objectMap(data, type){
    console.log("esta es data: ", data)
    let customized = {};
    this.arrayData = [];
    if(type == 1){
      console.log('consolidado')
      data.forEach((dato) => {
        customized = {
          "Código": dato.codigo,
          "Cédula": dato.documento,
          "Nombres y apellidos": dato.nombres,
          "Dirección": dato.direccion,
          "Barrio": dato.barrio,
          "Zona": dato.zona,
          "Teléfono": dato.telefono1,
          "Afiliación": dato.fechacontrato,
          "Último pago": dato.fecha_ult_pago,
          "Estado televisión": dato.estado_tv,
          "Saldo televisión": dato.saldo_tv,
          "Estado internet": dato.estado_int,
          "Saldo internet": dato.saldo_int,
          "Instalación televisión": dato.instalacion_tv,
          "Corte televisión": dato.corte_tv,
          "Traslado televisión": dato.traslado_tv,
          "Reconexión televisión": dato.reco_tv,
          "Instalación internet": dato.instalacion_int,
          "Corte internet": dato.corte_int,
          "Traslado internet": dato.traslado_int,
          "Reconexión internet": dato.rco_int
        }
        this.arrayData.push(customized)
      })
    }
    if (type == 2) {
      console.log('tv')      
      data.forEach((dato) => {
      customized = {
        "Código": dato.codigo,
        "Cédula": dato.documento,
        "Nombres y apellidos": dato.nombres,
        "Dirección": dato.direccion,
        "Barrio": dato.barrio,
        "Zona": dato.zona,
        "Teléfono": dato.telefono1,
        "Afiliación": dato.fechacontrato,
        "Último pago": dato.fecha_ult_pago,
        "Estado televisión": dato.estado_tv,
        "Saldo televisión": dato.saldo_tv,
        "Instalación televisión": dato.instalacion_tv,
        "Corte televisión": dato.corte_tv,
        "Traslado televisión": dato.traslado_tv,
        "Reconexión televisión": dato.reco_tv,
        }
        this.arrayData.push(customized)
      })
    }
    if (type == 3) {
      data.forEach((dato) => {
        customized = {
          "Código": dato.codigo,
          "Cédula": dato.documento,
          "Nombres y apellidos": dato.nombres,
          "Dirección": dato.direccion,
          "Barrio": dato.barrio,
          "Zona": dato.zona,
          "Teléfono": dato.telefono1,
          "Afiliación": dato.fechacontrato,
          "Último pago": dato.fecha_ult_pago,
           "Estado internet": dato.estado_int,
          "Saldo internet": dato.saldo_int,
           "Instalación internet": dato.instalacion_int,
          "Corte internet": dato.corte_int,
          "Traslado internet": dato.traslado_int,
          "Reconexión internet": dato.rco_int
        }  
        this.arrayData.push(customized)
      })
    }
    if (type == 4) {
      data.forEach((dato) => {
        customized = {
          "Código": dato.entidad_id,
          "Nombres y apellidos": dato.nombres,
          "Dirección": dato.direccion,
          "Zona": dato.zona,
          "Barrio": dato.barrio,
          "Código concepto": dato.cpto_cod,
          "Nombre concepto": dato.cpto_nombre,
          "Nro orden": dato.nrorden,
          "Valor": dato.valor,
          "Observación": dato.observacion,
          "Estado": dato.estado,
          "Fecha creación": dato.fechacreacion,
          "Usuario creación": dato.usuariocreacion,
          "Solicitado por": dato.solicitado,
          "Técnico asignado": dato.tecnico_asignado,
          "Fecha ejecución": dato.fechaejec,
          "Técnico ejecución": dato.tecnico_ejec,
          "Usuario cierra orden": dato.usuariocierra,
          "Solución orden": dato.solucion,
          "Fecha anulación": dato.fecha_anul,
          "Usuario anula orden": dato.usuarioanula,
          "Motivo anulación": dato.motivo_anul
        }
        this.arrayData.push(customized)
      })
    }
    if (type == 5) {
      data.forEach((dato) => {
        customized = {
          "Código": dato.codigo,
          "Cédula": dato.documento,
          "Nombres y apellidos": dato.nombres,
          "Factura No": dato.nrofact,
          "Valor mes": dato.valor,
          "Iva mes": dato.iva,
          "Total mes": dato.total,
          "Fecha": dato.fecha,
          "Observación": dato.observacion
        }  
        this.arrayData.push(customized)
      })
    }
    if (type == 6) {
      data.forEach((dato) => {
        customized = {
          "Código": dato.codigo,
          "Nombres y apellidos": dato.nombres,
          "Valor": dato.valor,
          "Descuento": dato.dcto,
          "Total": dato.total,
          "Recibo No": dato.nrorecibo,
          "Mes": dato.mes,
          "Nro factura": dato.nrofact,
          "Concepto": dato.observacion
        }  
        this.arrayData.push(customized)
      })
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string, type: number): void {
    console.log(type)
    this.objectMap(json, type)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.arrayData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}