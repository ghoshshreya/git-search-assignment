import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  /*----------TRANSFORMS THE VALUE BY REMOVING THE TEXT TO TO BE REPLACED----------*/ 
  transform(value: string, textToBeReplaced: string): any {
    value = value.replace(textToBeReplaced,'');
    return value;
  }

}