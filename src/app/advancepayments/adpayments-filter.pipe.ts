import { Pipe, PipeTransform } from '@angular/core';

import { AdPayments } from './adpayment';

@Pipe({
    name: 'adpaymentsfilter',
    pure: false
})
export class AdPaymentsFilterPipe implements PipeTransform {
  transform(items: AdPayments[], filter: AdPayments): AdPayments[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: AdPayments) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {AdPayments} adpayment 
   * @param {AdPayments} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(adpayment: AdPayments, filter: AdPayments): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (adpayment[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (adpayment[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}