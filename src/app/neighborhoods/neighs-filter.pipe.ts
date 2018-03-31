import { Pipe, PipeTransform } from '@angular/core';

import { Neighs } from './neighborhoods';

@Pipe({
    name: 'neighsfilter',
    pure: false
})
export class NeighsFilterPipe implements PipeTransform {
  transform(items: Neighs[], filter: Neighs): Neighs[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Neighs) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Neighs} country 
   * @param {Neighs} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(neighs: Neighs, filter: Neighs): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (neighs[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (neighs[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}