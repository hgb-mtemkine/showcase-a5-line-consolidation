import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as _ from 'lodash';
import * as EXOP from 'gen/exop';


@Component({
  selector: 'my-crawl-attempt-branching',
  templateUrl: './crawl-attempt-branching.component.html',
  styleUrls: ['./crawl-attempt-branching.component.less']
})
export class CrawlAttemptBranchingComponent implements OnInit {

  @Input()
  vm: EXOP.VizVmCrawlLogAttempt;

  constructor(
    private exopUtils: EXOP.ExopService,
  ) { }

  ngOnInit() {
  }

  goToSourcePosition(location: EXOP.WernScriptLocation) {
    if (!location)
      return;
    this.exopUtils.exinvoke_goToSourcePosition(location);
  }
}
