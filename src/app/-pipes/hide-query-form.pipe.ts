import { Pipe, PipeTransform } from '@angular/core';
import * as EXOP from 'gen/exop';

@Pipe({
  name: 'hideQueryForm'
})
export class HideQueryFormPipe implements PipeTransform {

  transform(value: EXOP.VizVmType): any {
    return (value == EXOP.VizVmType.WernickeError); // add more conditions if need be
  }

}
