import { Pipe, PipeTransform } from '@angular/core';

import { Countries } from './countries';

@Pipe({
    name: 'countriesfilter',
    pure: false
})
export class CountriesFilterPipe implements PipeTransform {
  transform(items: Countries[], filter: Countries): Countries[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Countries) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Countries} country 
   * @param {Countries} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(country: Countries, filter: Countries): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (country[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (country[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}