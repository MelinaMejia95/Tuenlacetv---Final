import { Pipe, PipeTransform } from '@angular/core';

import { Companies } from './company';

@Pipe({
    name: 'companiesfilter',
    pure: false
})
export class CompaniesFilterPipe implements PipeTransform {
  transform(items: Companies[], filter: Companies): Companies[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Companies) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Companies} company 
   * @param {Companies} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(company: Companies, filter: Companies): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (company[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (company[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}