import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HideQueryFormPipe } from './hide-query-form.pipe';
import { IterablePipe } from './iterable.pipe';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HideQueryFormPipe,
    IterablePipe,
    YesNoPipe,
  ],
  exports: [
    HideQueryFormPipe,
    IterablePipe,
    YesNoPipe,
  ]
})
export class MyPipesModule { }
