import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { AppComponent } from './app.component';
import { AnimateLineConsolidationComponent } from 'app/animate-line-consolidation/animate-line-consolidation.component';
import {CarouselModule} from "angular2-carousel";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AnimateLineConsolidationComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
    Ng2CarouselamosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
