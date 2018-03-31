import { Pipe, PipeTransform } from '@angular/core';

import { Banks } from './banks';

@Pipe({
    name: 'banksfilter',
    pure: false
})
export class BanksFilterPipe implements PipeTransform {
  transform(items: Banks[], filter: Banks): Banks[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Banks) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Banks} bank 
   * @param {Banks} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(bank: Banks, filter: Banks): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (bank[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (bank[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}