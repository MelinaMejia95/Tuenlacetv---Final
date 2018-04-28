import { Pipe, PipeTransform } from '@angular/core';

import { GBillings } from './gbillings';

@Pipe({
    name: 'gbillingsfilter',
    pure: false
})
export class GBillingsFilterPipe implements PipeTransform {
  transform(items: GBillings[], filter: GBillings): GBillings[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: GBillings) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {GBillings} gbilling 
   * @param {GBillings} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(gbilling: GBillings, filter: GBillings): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (gbilling[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (gbilling[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}