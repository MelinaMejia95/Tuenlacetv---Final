import { Pipe, PipeTransform } from '@angular/core';

import { Departaments } from './dep';

@Pipe({
    name: 'depsfilter',
    pure: false
})
export class DepartmentsFilterPipe implements PipeTransform {
  transform(items: Departaments[], filter: Departaments): Departaments[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Departaments) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Departaments} dep 
   * @param {Departaments} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(dep: Departaments, filter: Departaments): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (dep[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (dep[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}