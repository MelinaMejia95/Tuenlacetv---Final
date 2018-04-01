import { Pipe, PipeTransform } from '@angular/core';

import { Payments } from './payment';

@Pipe({
    name: 'paymentsfilter',
    pure: false
})
export class PaymentsFilterPipe implements PipeTransform {
  transform(items: Payments[], filter: Payments): Payments[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Payments) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Payments} payment 
   * @param {Payments} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(payment: Payments, filter: Payments): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (payment[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (payment[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}