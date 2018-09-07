import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './ngx-slider/slider.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SliderComponent
  ],
  exports: [
    SliderComponent
  ]
})
export class MyCommonControlsModule { }
