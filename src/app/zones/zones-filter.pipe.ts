import { Pipe, PipeTransform } from '@angular/core';

import { Zones } from './zones';

@Pipe({
    name: 'zonesfilter',
    pure: false
})
export class ZonesFilterPipe implements PipeTransform {
  transform(items: Zones[], filter: Zones): Zones[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Zones) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Zones} zone 
   * @param {Zones} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(zone: Zones, filter: Zones): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (zone[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (zone[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}