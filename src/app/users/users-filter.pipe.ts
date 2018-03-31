import { Pipe, PipeTransform } from '@angular/core';

import { Users } from './users';

@Pipe({
    name: 'usersfilter',
    pure: false
})
export class UsersFilterPipe implements PipeTransform {
  transform(items: Users[], filter: Users): Users[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Users) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Users} user 
   * @param {Users} filter The filter to apply.
   * @return {boolean} 
   */
  applyFilter(user: Users, filter: Users): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (user[field].toString().toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (user[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}