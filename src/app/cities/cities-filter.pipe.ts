import { Pipe, PipeTransform } from '@angular/core';

import { Cities } from './cities';

@Pipe({
    name: 'citiesfilter',
    pure: false
})
export class CitiesFilterPipe implements PipeTransform {
  transform(items: Cities[], filter: Cities): Cities[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Cities) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Cities} city 
   * @param {Cities} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(city: Cities, filter: Cities): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (city[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (city[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}