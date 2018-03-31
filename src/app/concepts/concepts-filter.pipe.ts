import { Pipe, PipeTransform } from '@angular/core';

import { Concepts } from './concepts';

@Pipe({
    name: 'conceptsfilter',
    pure: false
})
export class ConceptsFilterPipe implements PipeTransform {
  transform(items: Concepts[], filter: Concepts): Concepts[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Concepts) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Concepts} concept 
   * @param {Concepts} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(concept: Concepts, filter: Concepts): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (concept[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (concept[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}