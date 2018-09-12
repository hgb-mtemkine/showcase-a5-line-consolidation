import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'angular2-carousel';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { ConsolidationAnimationModule } from 'app/consolidation-animation/consolidation-animation.module';
import { LevensteinService } from 'app/levenstein.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
