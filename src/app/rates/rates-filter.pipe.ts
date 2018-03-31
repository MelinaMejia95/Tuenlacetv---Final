import { Pipe, PipeTransform } from '@angular/core';

import { Rates } from './rates';

@Pipe({
    name: 'ratesfilter',
    pure: false
})
export class RatesFilterPipe implements PipeTransform {
  transform(items: Rates[], filter: Rates): Rates[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Rates) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Rates} rate 
   * @param {Rates} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(rate: Rates, filter: Rates): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (rate[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (rate[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}