import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(search: any, searchStr: any): any {
    if(searchStr === undefined) return search;
    return search.filter(function(xx){
      return xx.firstname.toLowerCase().includes(searchStr.toLowerCase()) + xx.lastname.toLowerCase().includes(searchStr.toLowerCase());
    })
    
  }

}
