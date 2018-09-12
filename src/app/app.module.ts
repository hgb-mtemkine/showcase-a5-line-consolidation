import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'angular2-carousel';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { ConsolidationAnimationModule } from 'app/consolidation-animation/consolidation-animation.module';

import { AppComponent } from './app.component';
import { LevensteinService } from './services/levenstein.service';
import { LocalJsonDataService } from './services/local-json.service';
import { WernickeMovieComponent } from './wernicke-movie/wernicke-movie.component';
import { WernCrawlAnimationModule } from 'app/-wern-animation/-wern-crawl-animation.module';


@NgModule({
  declarations: [
    AppComponent,
    WernickeMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    Ng2CarouselamosModule,
    ConsolidationAnimationModule,
    WernCrawlAnimationModule
  ],
  providers: [
    LevensteinService,
    LocalJsonDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
