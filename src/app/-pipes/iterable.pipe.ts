import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'iterable' })
export class IterablePipe implements PipeTransform {
  transform(value: number): any {
    const iterable = {};
    iterable[Symbol.iterator] = function* () {
      let n = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iterable;
  }
}
