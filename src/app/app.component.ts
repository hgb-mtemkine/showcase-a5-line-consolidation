import { Component } from '@angular/core';
import { LineConsolidationLog, LineConsolidationSnapshot, LineConsolidationAlteration, LineConsolidationAction } from 'app/models/log-vm';

@Component({
  selector: 'blah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public lineVm: LineConsolidationLog;

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
            'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm --class Business',
            'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
          ],
          alterations: []
        }
      ]
    };
  }
}
