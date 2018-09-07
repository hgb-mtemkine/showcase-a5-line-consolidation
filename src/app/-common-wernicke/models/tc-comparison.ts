import * as EXOP from 'gen/exop';

export class TcLevensteinComparisonItem {
  expected: string;
  actual: string;
  expectedRogue: number[];
  actualRogue: number[];
  actualSP: EXOP.WernScriptLocation;
}