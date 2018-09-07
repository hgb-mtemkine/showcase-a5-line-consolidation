import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import * as EXOP from 'gen/exop';

@Component({
  selector: 'my-crawl-attempt-branching2',
  templateUrl: './crawl-attempt-branching2.component.html',
  styleUrls: ['./crawl-attempt-branching2.component.less']
})
export class CrawlAttemptBranching2Component implements OnInit {

  @Input()
  text: string;
  // @Input()
  // text2: string;
  @Input()
  branchRem: EXOP.VizVmLogWernickeCharToken[];
  @Input()
  convergeIndex: number;
  @Input()
  isSuccess: boolean;
  @Input()
  isFailure: boolean;

  mainChars1: string[];
  mainChars2: string[];

  constructor() { }

  ngOnInit() {}
  ngOnChanges() {
    this.mainChars1 = _.map(this.text.slice(0, this.convergeIndex), (ccc, i) => ccc);
    this.mainChars2 = _.map(this.text.slice(this.convergeIndex), (ccc, i) => ccc);
  }

}
