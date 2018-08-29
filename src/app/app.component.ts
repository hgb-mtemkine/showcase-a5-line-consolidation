import { Component } from '@angular/core';
import { LineConsolidationLog, LineConsolidationAlteration, LineConsolidationSnapshot, LineConsolidationAction, LineModify } from 'app/models/log-vm';
import { LevensteinService } from 'app/levenstein.service';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@Component({
  selector: 'blah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public lineVm: LineConsolidationLog;
  items: any[];
  public remArr: any[];
  public subNew: LineModify[];
  public currentSlide: number = 1;
  public selectedIndex: number;

  constructor(
    private levService: LevensteinService,
  ) {
    
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
            'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm --class Business',
            'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
          ],
          alterations: []
        },
        <LineConsolidationSnapshot> {
          lines: [
            'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm',
            'flight --to manila --from tokyo --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
            'flight --airline Cathay Pacific',
          ],
          alterations: [
            <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Remove },
            <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --date feb 13th --airline Cathay Pacific --to quito --time-depart 3:35 pm' },
          ]
        },
        
      ]
    };
    //set items equal to snapshots
    this.items = this.lineVm.snapshots;
    this.remArr = this.removeFound(this.lineVm);
    //console.log(this.subNew);
  }

  //receive lineVm and return array of indexes to be removed
  removeFound(lv: LineConsolidationLog): Array<number>{
    var lastIndex: number;
    var numRem:number[] = [];
    var temp:LineModify[] = [];
    var i:number = 0; //number of snapshots
    for (let snap of lv.snapshots) {
      i++;
      for (let alt of snap.alterations) {
        if(alt.action === LineConsolidationAction.Remove ) {  
          if(snap.lines[alt.index].includes("flight")) {
            lastIndex = snap.lines[alt.index].length -9; //flight
          } else {
            lastIndex = snap.lines[alt.index].length -8; //hotel
          }
          numRem.push(alt.index);
        } else if (alt.action === LineConsolidationAction.Modify){
          let sssA = String(snap.lines[alt.index]); //old
          let sssB = String(alt.text);   //new
          let levensteinData = this.levService.computeLevensteinDiff(sssA, sssB);
          let fragments = this.levService.stringToFragments(sssB, levensteinData.rogueIndicesB);

          temp.push({ index: alt.index , 
                      text: this.levService.splitIntoRegions(sssA, sssB, levensteinData.rogueIndicesB, lastIndex), 
                    }); 
            //console.log(sssA);
            //console.log(sssB);
            //console.log(levensteinData.rogueIndicesB);
            //console.log(fragments[0].text);
            //console.log(sssB.substring(levensteinData.rogueIndicesB[0], levensteinData.rogueIndicesB[levensteinData.rogueIndicesB.length -1] ));

          //debugger;
        }
      }
      if (i > numRem.length) {
        numRem.push(100000); //filler
        temp.push({index: 10000000, text: []});
      } 
      //console.log(numRem);
    }
    this.subNew = temp;
    //console.log(this.subNew);
    return numRem;
  }

}
