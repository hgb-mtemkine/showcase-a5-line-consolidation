import { Component, Input } from '@angular/core';
import { LevensteinService } from 'app/levenstein.service';
import { LineConsolidationLog } from 'app/models/log-vm';

@Component({
  selector: 'blah-animate-line',
  templateUrl: './animate-line.component.html',
  styleUrls: ['./animate-line.component.less']
})
export class AnimateLineComponent {

  @Input() vm: LineConsolidationLog;

  public curIndex: number;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.curIndex = 0;
  }

   
}

