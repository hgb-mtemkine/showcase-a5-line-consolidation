export enum LineConsolidationAction {
  None,
  Add,
  Remove,
  Modify
}



export class LineConsolidationLog {
  snapshots: LineConsolidationSnapshot[]
}

export class LineConsolidationSnapshot {
  lines: string[];
  alterations: LineConsolidationAlteration[];
}

export class LineConsolidationAlteration {
  index: number;
  action: LineConsolidationAction;
  text: string;
}

export class LineModify {
  index: number;
  text: string[];
}