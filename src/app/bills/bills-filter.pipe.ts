import { Pipe, PipeTransform } from '@angular/core';

import { Bills } from './bills';

@Pipe({
    name: 'billsfilter',
    pure: false
})
export class BillsFilterPipe implements PipeTransform {
  transform(items: Bills[], filter: Bills): Bills[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Bills) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Bills} bill 
   * @param {Bills} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(bill: Bills, filter: Bills): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (bill[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (bill[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}