import { Component, OnInit, Input } from '@angular/core';

import { WernickeMovieVM } from 'app/models/movie-vm';
import { LocalJsonDataService } from 'app/services/local-json.service';

@Component({
  selector: 'blah-wernicke-movie-playlist',
  templateUrl: './wernicke-movie-playlist.component.html',
  styleUrls: ['./wernicke-movie-playlist.component.less']
})
export class WernickeMoviePlaylistComponent implements OnInit {
  
  @Input()
  crawLogFrameDelay: number = 3;
  @Input()
  crawLogNSkipFrameFF: number = 15;
  @Input()
  crawLogSlomoTimeoutMax: number = 50;
  @Input()
  act1StartDelay: number = 0;

  public movieVm: WernickeMovieVM;

  private curIndex = 0;
  private movieFilenames = [
    'sample1.json',
    'sample2.json',
    'sample3.json',
  ];

  constructor(
    private jsonDataService: LocalJsonDataService,
  ) { }

  ngOnInit() {
    this.curIndex = 0;
    this.startMovie();
  }

  startMovie() {
    let filename = this.movieFilenames[this.curIndex];
    this.jsonDataService.getMovieJsonByFilename(filename).then(vm => {
      this.movieVm = vm;
    });
  }

  curMovieDone() {
    this.curIndex++;
    if (this.curIndex >= this.movieFilenames.length)
      this.curIndex = 0;
    this.startMovie();
  }



  //=======================================================================

  // NOTE: keeping this code for reference

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
  // this.lineVm = <LineConsolidationLog> {
  //   snapshots: [
  //     <LineConsolidationSnapshot> {
  //       lines: [
  //         'flight --from miami --date feb 13th',
  //         'flight --to quito --time-depart 3:35 pm',
  //         'flight --class Business',
  //         'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
  //       ],
  //       alterations: [
  //         <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Add }, // line initally hidden and then fades in 
  //         <LineConsolidationAlteration> { index: 1, action: LineConsolidationAction.Remove },
  //         <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm' },
  //       ]
  //     },
  //     <LineConsolidationSnapshot> {
  //       lines: [
  //         'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm',
  //         'flight --class Business',
  //         'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
  //       ],
  //       alterations: [
  //         <LineConsolidationAlteration> { index: 1, action: LineConsolidationAction.Remove },
  //         <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm --class Business' },
  //       ]
  //     },
  //     <LineConsolidationSnapshot> {
  //       lines: [
  //         'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm --class Business',
  //         'flight --to miami --from mexico city --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
  //       ],
  //       alterations: []
  //     },
  //     <LineConsolidationSnapshot> {
  //       lines: [
  //         'flight --from miami --date feb 13th',
  //         'flight --to manila --from tokyo --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
  //         'flight --airline Cool Beans Are Great --time-arrival 3:59 pm',
  //       ],
  //       alterations: [
  //         <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Remove },
  //         <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'flight --from miami --airline cathay almonds --time-depart 3:35 pm --date feb 13th' },
  //       ]
  //     },
  //     <LineConsolidationSnapshot> {
  //       lines: [
  //         'cool pepper squad',
  //         'flight --to manila --from tokyo --time-depart 7:10 am --time-arrival 11:35 am --date feb 24th',
  //         'flight --airline Cool Beans Are Great --time-arrival 3:59 pm',
  //       ],
  //       alterations: [
  //         <LineConsolidationAlteration> { index: 2, action: LineConsolidationAction.Remove },
  //         <LineConsolidationAlteration> { index: 0, action: LineConsolidationAction.Modify, text: 'cool pipper squad' },
  //       ]
  //     },
      
  //   ]
  // };


}
