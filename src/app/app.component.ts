import { Component } from '@angular/core';

import { LineConsolidationAction, LineConsolidationAlteration, LineConsolidationLog, LineConsolidationSnapshot } from 'app/models/log-vm';

import { LevensteinService } from './services/levenstein.service';
import { LocalJsonDataService } from './services/local-json.service';
import { WernickeMovieVM } from './models/movie-vm';

@Component({
  selector: 'blah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public lineVm: LineConsolidationLog;
  public movieVm: WernickeMovieVM;

  constructor(
    private levService: LevensteinService,
    private jsonDataService: LocalJsonDataService,
  ) {}

  ngOnInit(): void {
    this.jsonDataService.getSampleDebugVM().then(vm => {
      this.movieVm = vm;
    });

    // this.lineVm = <LineConsolidationLog>{
    //   "snapshots": [{
    //     "lines": [
    //       "hotel --city [city]{baltimore md} --checkin january --near abet-cac excom meeting",
    //       "noop", "flight --from bgo --to bwi --misc [city]{[city]{bergen} [country]{norway}}",
    //       "flight --from bwi --to [airport]{bgo} --misc [city]{baltimore md}",
    //       "flight --date [weekday]{thursday} [ordinal]{[num]{11}} [month]{january} [year]{2018} --to [airport]{ams} --time-depart [num]{10}:[num]{00} --airline klm",
    //       "flight --from [airport]{ams} --to [city]{detroit} --time-depart [num]{13}:[num]{00}",
    //       "flight --from [city]{detroit} --to [airport]{bwi} --time-depart [num]{17}:[num]{30}",
    //       "flight --date [weekday]{sunday} [ordinal]{[num]{14}} [month]{january} --time-depart [num4]{2018}",
    //       "flight --from msp --to ams --time-depart [num]{19}:[num]{38}",
    //       "flight --from ams --to bgo --time-depart [num]{12}:[num]{00}",
    //       "flight --airline klm", "flight --airline delta",
    //       "info --type freq-flyer-num --value delta 2068672902"
    //     ]
    //   }]
    // };
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
            <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Add }, // line initally hidden and then fades in 
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
