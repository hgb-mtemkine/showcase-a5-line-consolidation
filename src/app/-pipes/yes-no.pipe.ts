import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  private yesText: String = 'Yes';
  private noText: String = 'No';
  transform(value: any, yesText: any, noText: any): any {
    if (yesText !== null) {
      this.yesText = yesText;
    }

    if (noText !== null) {
      this.noText = noText;
    }

    return value ? this.yesText : this.noText;
  }

}
