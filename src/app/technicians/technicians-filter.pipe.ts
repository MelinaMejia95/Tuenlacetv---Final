import { Pipe, PipeTransform } from '@angular/core';

import { Techs } from './technician';

@Pipe({
    name: 'techsfilter',
    pure: false
})
export class TechsFilterPipe implements PipeTransform {
  transform(items: Techs[], filter: Techs): Techs[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Techs) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Techs} tech 
   * @param {Techs} filter The filter to apply.
   * @return {Techs} 
   */
  applyFilter(tech: Techs, filter: Techs): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (tech[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (tech[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}