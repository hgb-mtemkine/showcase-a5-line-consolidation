import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

import { WernickeMovieVM } from 'app/models/movie-vm';

import { MyMovieAct } from './my-models';
import { LocalJsonDataService } from 'app/services/local-json.service';


@Component({
  selector: 'blah-wernicke-movie',
  templateUrl: './wernicke-movie.component.html',
  styleUrls: ['./wernicke-movie.component.less']
})
export class WernickeMovieComponent implements OnInit, OnChanges {

  readonly DelayDone = 1000;

  readonly MyMovieAct = MyMovieAct;

  public curAct: MyMovieAct = MyMovieAct.None;

  @Input()
  vm: WernickeMovieVM;

  @Input()
  crawLogFrameDelay: number = 3;
  @Input()
  crawLogNSkipFrameFF: number = 15;
  @Input()
  crawLogSlomoTimeoutMax: number = 50;
  @Input()
  act1StartDelay: number = 0;

  @Output()
  onMovieDone = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}
  ngOnChanges() {
    if (this.vm)
      this.curAct = MyMovieAct.Act1;
    else
      this.curAct = MyMovieAct.None;
  }

  act1AnimationFinished() {
    this.curAct = MyMovieAct.Act2;
  }

  act2AnimationFinished() {
    setTimeout(() => {
      this.onMovieDone.emit();
    }, this.DelayDone);
  }
}
