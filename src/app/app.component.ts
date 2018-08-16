import { Component } from '@angular/core';
import { LineConsolidationLog, LineConsolidationAlteration, LineConsolidationSnapshot, LineConsolidationAction } from 'app/models/log-vm';

@Component({
  selector: 'blah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public lineVm: LineConsolidationLog;
  items: any[];
  public remArr: Array<number>;

  constructor() {
  }

  ngOnInit(): void {
    this.lineVm = <LineConsolidationLog> {
      snapshots: [
        <LineConsolidationSnapshot> {
          lines: [
            'flight --from miami --date feb 13th',
            'flight --to quito --time-depart 3:35 pm',
            'flight --class Business',
            'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
          ],
          alterations: [
            <LineConsolidationAlteration> { index: 1, action: LineConsolidationAction.Remove },
            <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm' },
          ]
        },
        <LineConsolidationSnapshot> {
          lines: [
            'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm',
            'flight --class Business',
            'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
          ],
          alterations: [
            <LineConsolidationAlteration> { index: 1, action: LineConsolidationAction.Remove },
            <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm --class Business' },
          ]
        },
        <LineConsolidationSnapshot> {
          lines: [
            'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm',
            'flight --class Economy',
            'flight --to manila --from tokyo --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
          ],
          alterations: [
            <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Remove },
            <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --date feb 13th --to quito --time-depart 5:50 pm ' },
          ]
        },
        <LineConsolidationSnapshot> {
          lines: [
            'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm --class Business',
            'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
          ],
          alterations: []
        },
        
      ]
    };
    //set items equal to snapshots
    this.items = this.lineVm.snapshots;
    this.remArr = this.removeFound(this.lineVm);
  }

  //receive lineVm and return array of indexes to be removed
  removeFound(lv: LineConsolidationLog): Array<number>{
    var numRem:number[] = [];
    var i:number = 0; //number of snapshots
    for (let snap of lv.snapshots) {
      i++;
      for (let alt of snap.alterations) {
        if(alt.action === LineConsolidationAction.Remove ) {  
          numRem.push(alt.index);
        }
      }
      if (i > numRem.length) {
        numRem.push(100000); //filler
      }
      console.log(numRem);
    }
    console.log("# of snaps "+i);
    console.log('length of numRem ' + (numRem.length));
    return numRem;
  }
}
