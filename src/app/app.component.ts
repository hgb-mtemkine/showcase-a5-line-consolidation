import { Component } from '@angular/core';

import { LineConsolidationAction, LineConsolidationAlteration, LineConsolidationLog, LineConsolidationSnapshot } from 'app/models/log-vm';

import { LevensteinService } from './services/levenstein.service';
import { WernickeMovieVM } from './models/movie-vm';

@Component({
  selector: 'blah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {

  constructor() {}

  ngOnInit() {}


}
