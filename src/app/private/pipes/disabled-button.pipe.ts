import { Pipe, PipeTransform } from '@angular/core';

import { IsEqual } from '../helpers';

@Pipe({
  name: 'disabledButton',
  standalone: true
})
export class DisabledButtonPipe implements PipeTransform {

  transform(value1: any, value2: any, ...args: unknown[]): unknown {
    return IsEqual(value1, value2);
  }

}
