import { Component, OnInit, Input } from '@angular/core';
import { TextFragmentHighLevelVM } from 'app/-common-wernicke/models/word-rectangles-vm';

@Component({
  selector: 'my-crawl-log-regioned-line-no-overlap',
  templateUrl: './crawl-log-regioned-line-no-overlap.component.html',
  styleUrls: ['./crawl-log-regioned-line-no-overlap.component.less']
})
export class CrawlLogRegionedLineNoOverlapComponent implements OnInit {

  @Input()
  fragments: TextFragmentHighLevelVM[];
  @Input()
  isFinalFrame: boolean;

  constructor() { }

  ngOnInit() {
  }

  onFragmentClicked(fff: TextFragmentHighLevelVM) {
    if (!fff.sourceRegion)
      return;
    console.log(`TODO: onFragmentClicked`, fff);
    //this.onRogueFragmentClicked.emit(fff.sourceRegion);
  }
}
