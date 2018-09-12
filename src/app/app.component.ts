import { Component } from '@angular/core';
import { LineConsolidationLog, LineConsolidationAlteration, LineConsolidationSnapshot, LineConsolidationAction, LineModify } from 'app/models/log-vm';
import { LevensteinService } from 'app/levenstein.service';

import * as JsDiff from 'diff';

@Component({
  selector: 'blah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public lineVm: LineConsolidationLog;

  constructor(
    public levService: LevensteinService,
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
            'flight --from miami --date feb 13th',
            'flight --to manila --from tokyo --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
            'flight --airline Cool Beans Are Great --time-arrival 3:59 pm',
          ],
          alterations: [
            <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Remove },
            <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --airline cathay almonds --time-depart 3:35 pm --date feb 13th' },
          ]
        },
        <LineConsolidationSnapshot> {
          lines: [
            'cool pepper squad',
            'flight --to manila --from tokyo --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
            'flight --airline Cool Beans Are Great --time-arrival 3:59 pm',
          ],
          alterations: [
            <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Remove },
            <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'cool pipper squad' },
          ]
        },
        
      ]
    };
  }


}
