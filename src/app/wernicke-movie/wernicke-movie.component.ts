import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

import { WernickeMovieVM } from 'app/models/movie-vm';

import { MyMovieAct } from './my-models';

@Component({
  selector: 'blah-wernicke-movie',
  templateUrl: './wernicke-movie.component.html',
  styleUrls: ['./wernicke-movie.component.less']
})
export class WernickeMovieComponent implements OnInit, OnChanges {

  readonly MyMovieAct = MyMovieAct;

  public curAct: MyMovieAct = MyMovieAct.None;

  @Input()
  vm: WernickeMovieVM;

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


}
