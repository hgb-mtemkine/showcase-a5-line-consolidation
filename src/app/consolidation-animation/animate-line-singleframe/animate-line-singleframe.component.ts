import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as JsDiff from 'diff';

import { LineConsolidationAction, LineConsolidationSnapshot } from 'app/models/log-vm';
import { LevensteinService } from 'app/services/levenstein.service';

import { LineConsolidationSingleLineVM } from './my-models';

@Component({
  selector: 'blah-animate-line-singleframe',
  templateUrl: './animate-line-singleframe.component.html',
  styleUrls: ['./animate-line-singleframe.component.less']
})
export class AnimateLineSingleframeComponent implements OnChanges {

  readonly LineConsolidationAction = LineConsolidationAction;

  @Input()
  vm: LineConsolidationSnapshot;
  @Input()
  autoPlay: boolean = false;
  @Output()
  onSceneCompleted = new EventEmitter<void>();

  public myLines: LineConsolidationSingleLineVM[];

  constructor(
    private levService: LevensteinService,
  ) {  }

  ngOnInit() {}
  ngOnChanges() {
    // debugger;
    this.myLines = this.vm.lines.map(x => <LineConsolidationSingleLineVM> {
      action: LineConsolidationAction.None,
      text: x
    });
    
    // NOTE: null check
    this.vm.alterations && this.vm.alterations.forEach(alteration => {
      let target = this.myLines[alteration.index];
      target.action = alteration.action;
      if (alteration.action === LineConsolidationAction.Modify) {
        // .... use JsDiff to compute diff regions
        let jdiff = JsDiff.diffWordsWithSpace(target.text, alteration.text);
        let regions = this.getDiff(jdiff);
        target.textMod1 = regions[0];
        target.textMod2 = regions[1];
        target.textMod3 = regions[2];
      }
      else if (alteration.action == LineConsolidationAction.Remove) {
        // .... nothing to do...
      }
    });

    if (this.autoPlay) {
      setTimeout(() => {
        this.onSceneCompleted.emit();
      }, 2000)
    }


  }

  public getDiff(obj: any): Array<string> {
    let diffStr = [];
    for (let ooo of obj){
      if( Object.keys(ooo).length == 2 || ooo.added == true){
        diffStr.push(ooo.value);
      }
    }
    return diffStr;
  }

}
