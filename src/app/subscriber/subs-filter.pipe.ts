import { Pipe, PipeTransform } from '@angular/core';

import { Subs } from './subs';

@Pipe({
    name: 'subsfilter',
    pure: false
})
export class SubsFilterPipe implements PipeTransform {
  transform(items: Subs[], filter: Subs): Subs[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Subs) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Subs} book The book to compare to the filter.
   * @param {Subs} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
  applyFilter(book: Subs, filter: Subs): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (book[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (book[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}