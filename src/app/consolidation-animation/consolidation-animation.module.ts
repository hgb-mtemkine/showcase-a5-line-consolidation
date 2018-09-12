import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'angular2-carousel';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { LevensteinService } from 'app/services/levenstein.service';

import { AnimateLineSingleframeComponent } from './animate-line-singleframe/animate-line-singleframe.component';
import { AnimateLineComponent } from './animate-line/animate-line.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    BrowserAnimationsModule,
    Ng2CarouselamosModule
  ],
  declarations: [
    AnimateLineComponent,
    AnimateLineSingleframeComponent,
  ],
  providers: [LevensteinService],
  exports: [AnimateLineComponent],
})
export class ConsolidationAnimationModule { }
