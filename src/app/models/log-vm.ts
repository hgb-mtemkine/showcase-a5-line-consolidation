export enum LineConsolidationAction {
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