import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateLineComponent } from './animate-line/animate-line.component';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import {CarouselModule} from "angular2-carousel";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevensteinService } from 'app/levenstein.service';
import { AnimateLineSingleframeComponent } from './animate-line-singleframe/animate-line-singleframe.component';

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
