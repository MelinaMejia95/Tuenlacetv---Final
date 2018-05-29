import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }
  arrayData = []

  objectMap(data){
    console.log("esta es data: ", data)
    data.forEach((dato) => {
      let customized
      customized = {
        "Código": dato.codigo,
        "Cédula": dato.documento,
        "Nombres y apellidos": dato.nombres,
        "Dirección": dato.direccion,
        "Barrio": dato.barrio,
        "Zona": dato.zona,
        "Teléfono": dato.telefono1,
        "Afiliación": dato.fechacontrato,
        "Ultimo pago": dato.fecha_ult_pago,
        "Estado televisión": dato.estado_tv,
        "Saldo televisión": dato.saldo_tv,
        "Estado internet": dato.estado_int,
        "Instalación televisión": dato.instalacion_tv,
        "Corte televisióntv": dato.corte_tv,
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

  public exportAsExcelFile(json: any[], excelFileName: string): void {
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