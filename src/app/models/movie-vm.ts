import * as EXOP from 'gen/exop';

import * as _ from 'lodash';

import { LineConsolidationLog } from './log-vm';


export class WernickeMovieVM {
  Act1: EXOP.VizVmWernickeLogEntry[];
  Act2: LineConsolidationLog;

  constructor(init?: Partial<WernickeMovieVM>) {
    Object.assign(this, init, {
      Act1: _.map(init.Act1, x => x ? new EXOP.VizVmWernickeLogEntry(x) : null),
      Act2: new LineConsolidationLog(init.Act2),
    });
  }
}