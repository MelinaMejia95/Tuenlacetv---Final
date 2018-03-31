import { Pipe, PipeTransform } from '@angular/core';

import { Plans } from './plans';

@Pipe({
    name: 'plansfilter',
    pure: false
})
export class PlansFilterPipe implements PipeTransform {
  transform(items: Plans[], filter: Plans): Plans[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Plans) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Plans} plans 
   * @param {Plans} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(plans: Plans, filter: Plans): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (plans[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (plans[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}