import * as EXOP from 'gen/exop';

export class SentenceSegmentsVm {
  segments: SentenceSegmentVm[];
}

export class SentenceSegmentVm {
  originalText:string;
  outlines: SentenceSegmentOutlineVm[];
}

export class SentenceSegmentOutlineVm {
  ex_region: EXOP.VizVmTextRegion;
  text:string;
  comment: string;
  cssLevelClass:string;
}

export class RectangledSentenceSimpleVM_obsolete {
  text: string;
  notes: string;
  isMatch: boolean;
  isPass2Match: boolean;
  isPass3Match: boolean;
  isNoop: boolean;
  sourceRegion:EXOP.VizVmTextRegion;
}

export class TextFragmentHighLevelVM {
  text: string;
  sourceRegion:EXOP.VizVmTextRegion;
  sourceRegionPass3:EXOP.VizVmTextRegionPass3;
  innerFragments: TextFragmentHighLevelVM[];
}