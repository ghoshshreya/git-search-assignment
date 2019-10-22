import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clipString',
  pure: false
})
export class ClipStringPipe implements PipeTransform {
  /*----------TRANSFORMS THE VALUE BY LIMITING THE CHARACTER SIZE TO THE LIMIT PROVIDED----------*/   
  transform(value: string, limit: number): any {
    if(value.length > limit)
    {
      value = value.substr(0, limit)+"...";
    }    
    return value;
  }
}