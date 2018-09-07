import * as EXOP from 'gen/exop';

export class WernickeCrawlLogGroupedVM {
  prefixEntries: EXOP.VizVmWernickeLogEntry[];
  groups: WernickeCrawlEntryGroupVM[];
}

export class WernickeCrawlEntryGroupVM {
  title: string;
  entries: EXOP.VizVmWernickeLogEntry[];
  detailsHidden: boolean;
}