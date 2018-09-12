import * as _ from 'lodash';


export enum LineConsolidationAction {
  None,
  Add,
  Remove,
  Modify
}



export class LineConsolidationLog {
  snapshots: LineConsolidationSnapshot[];
  
  constructor(init?: Partial<LineConsolidationLog>) {
    Object.assign(this, init, {
      snapshots: _.map(init.snapshots, x => x ? new LineConsolidationSnapshot(x) : null),
    });
  }
}

export class LineConsolidationSnapshot {
  lines: string[];
  alterations: LineConsolidationAlteration[];

  constructor(init?: Partial<LineConsolidationSnapshot>) {
    Object.assign(this, init, {
      alterations: _.map(init.alterations, x => x ? new LineConsolidationAlteration(x) : null),
    });
  }
}

export class LineConsolidationAlteration {
  index: number;
  action: LineConsolidationAction;
  text: string;

  constructor(init?: Partial<LineConsolidationAlteration>) {
    Object.assign(this, init, {
      action: isNaN(init.action) ? LineConsolidationAction[init.action] : init.action,
    });
  }
}

export class LineModify {
  index: number;
  text: string[];
}