import { Component, Input, OnChanges } from '@angular/core';
import { LevensteinService } from 'app/levenstein.service';
import { LineConsolidationAction, LineConsolidationSnapshot } from 'app/models/log-vm';
import * as JsDiff from 'diff';

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
  

  public myLines: LineConsolidationSingleLineVM[];

  constructor(
    private levService: LevensteinService,
  ) {  }

  ngOnInit() {}
  ngOnChanges() {
    //debugger;
    this.myLines = this.vm.lines.map(x => <LineConsolidationSingleLineVM> {
      action: LineConsolidationAction.None,
      text: x
    });
    
    this.myLines.forEach((x1, index) => this.vm.alterations.forEach((x2) =>  { 
      console.log("x1: " + index + " text: " + x1.text)
      console.log("x2: " + x2.index)
      if (index == x2.index) {
        x1.action = x2.action
        if (x2.action === LineConsolidationAction.Modify) {

          console.log("x1aaa: " + index)
          console.log("x2aaa: " + x2.index)
          let jdiff = JsDiff.diffWordsWithSpace(x1.text, x2.text);
          let regions = this.getDiff(jdiff);
          console.log("new: " + x2.text);
          console.log("old: " + x1.text);
          console.log(regions);
          x1.textMod1 = regions[0];
          x1.textMod2 = regions[1];
          x1.textMod3 = regions[2];        

        }
        else if (x2.action == LineConsolidationAction.Remove){
          console.log("x1rrr: " + index)
          console.log("x2rrr: " + x2.index)
        }
      }
      
    }));
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

  mapfn(x) {
    return <LineConsolidationSingleLineVM> {
      
    }
  }

}
