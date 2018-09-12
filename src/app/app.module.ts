import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { AppComponent } from './app.component';
import {CarouselModule} from "angular2-carousel";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevensteinService } from 'app/levenstein.service';
import { ConsolidationAnimationModule } from 'app/consolidation-animation/consolidation-animation.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
    Ng2CarouselamosModule,
    ConsolidationAnimationModule
  ],
  providers: [LevensteinService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
