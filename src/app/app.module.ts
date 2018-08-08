import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnimateLineConsolidationComponent } from './animate-line-consolidation/animate-line-consolidation.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimateLineConsolidationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
