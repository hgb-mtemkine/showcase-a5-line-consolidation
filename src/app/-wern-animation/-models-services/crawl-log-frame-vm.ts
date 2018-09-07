import * as EXOP from 'gen/exop';

export class CrawlLogFrameVM {
  text: string;
  resultRL: EXOP.VizVmRegionedLineNoOverlap;
  resultRLprev: EXOP.VizVmRegionedLineNoOverlap;
  //textOnBranch: string;
  branchRem: EXOP.VizVmLogWernickeCharToken[];
  offset: number;
  span: number;
  convergeIndex: number;
  isSuccess: boolean;
  isFailure: boolean;

  //textSpanned: string;
  //branching: EXOP.VizVmCrawlLogAttempt;
}

export class CrawlLogFramesWithSlomoVM {
  frames: CrawlLogFrameVM[];
  slomo1Index: number;
  slomo1Span: number;
  slomo2Index: number;
  slomo2Span: number;
}
