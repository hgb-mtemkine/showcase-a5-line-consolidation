import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';


//============================ enums ============================


export enum VizVmAnalysisPass3RuleUsageType {
  Used = 0,
  Obsolete = 1,
  ObsoleteDueToWhitespace = 2,
  ObsoleteDueToLowercase = 3,
}

export enum VizVmTextRegionType {
  PlainText = 0,
  Noop = 1,
  Pass3Match = 2,
  Pass2Match = 3,
}

export enum VizVmType {
  None = 0,
  HelpPage = 1,
  GettingStartedPage = 2,
  PleaseWaitPage = 3,
  ResultPass123Detailed = 4,
  ResultPass123HighLevel = 5,
  WernickeError = 6,
  CrawlerLog = 7,
  StructureWernRules = 8,
  StructureWernTrans = 9,
  AnalysisPass2 = 10,
  AnalysisPass3 = 11,
  AnalysisViewUsages = 12,
  AnalysisReverseEngineerFromSamples = 13,
  AnalysisNLG = 14,
  AnalysisSuccessRate = 15,
  TestCases = 16,
  TestCaseConflict = 17,
  TestCasesAddUpdateConfirmationPage = 18,
  ExperimentalView = 9999,
}

export enum VizVmWernickeLogEntryType {
  GroupHeading = 0,
  H1 = 1,
  H2 = 2,
  H3 = 3,
  P = 4,
  Code = 5,
  CrawlStart = 6,
  CrawlAttempt = 7,
  RegionedLine = 8,
}

export enum WernickeScriptType {
  Unset = 0,
  Pass1 = 1,
  Pass2 = 2,
  Pass3 = 3,
}

export enum WernickeTemplateTokenType {
  Plain = 0,
  RuleRef = 1,
  NestedSequence = 2,
}

//============================ classes ============================


/**
 * Source class: Wernicke.Grammar.ViewModels.AsyncOpWindowVM
 */
export class AsyncOpWindowVM {
  IsRunning: boolean;
  WernickeErrorVm: VizVmError;

  constructor(init?: Partial<AsyncOpWindowVM>) {
    Object.assign(this, init, {
      WernickeErrorVm: init.WernickeErrorVm ? new VizVmError(init.WernickeErrorVm) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.CliDeep.CliDeepStruct
 */
export class CliDeepStruct {
  Command: string;
  Params: CliDeepStructParam[];

  constructor(init?: Partial<CliDeepStruct>) {
    Object.assign(this, init, {
      Params: _.map(init.Params, x => x ? new CliDeepStructParam(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.CliDeep.CliDeepStructParam
 */
export class CliDeepStructParam {
  Name: string;
  Value: string;
  Fragments: CliDeepStructParamFragment[];

  constructor(init?: Partial<CliDeepStructParam>) {
    Object.assign(this, init, {
      Fragments: _.map(init.Fragments, x => x ? new CliDeepStructParamFragment(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.CliDeep.CliDeepStructParamFragment
 */
export class CliDeepStructParamFragment {
  Name: string;
  Value: string;
  ValueOriginal: string;

  constructor(init?: Partial<CliDeepStructParamFragment>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VisualizationVM
 */
export class VisualizationVM {
  Title: string;
  ViewType: VizVmType;
  WernickeErrorVm: VizVmError;
  PleaseWaitVm: VizVmPleaseWait;
  CrawlerLogVm: VizVmWernickeLogEntry[];
  RegionedLine: VizVmRegionedLine;
  RegionedLineNoOverlap: VizVmRegionedLineNoOverlap;
  TransformationResults: WernickeTransformationResultVM[];
  StructWernRules: WernRulesStructure;
  StructWernTrans: WernTransStructure;
  AnalysisPass2RuleSets: VizVmAnalysisWernRuleSet[];
  RuleSuggestions: WernRuleSuggestion[];
  AnalysisPass3: VizVmAnalysisPass3;
  AnalysisNlgList: VizVmAnalysisNLGEntry[];
  AnalysisSuccessRate: VizVmAnalysisSuccessRate;
  TestCasesVm: VizVmTestCases;
  TestCaseConflictVm: VizVmTestCaseResult;
  Debug_P1SeedEntries: VizVmDebug_PhraseAndItsSplits[];

  constructor(init?: Partial<VisualizationVM>) {
    Object.assign(this, init, {
      ViewType: isNaN(init.ViewType) ? VizVmType[init.ViewType] : init.ViewType,
      WernickeErrorVm: init.WernickeErrorVm ? new VizVmError(init.WernickeErrorVm) : null,
      PleaseWaitVm: init.PleaseWaitVm ? new VizVmPleaseWait(init.PleaseWaitVm) : null,
      CrawlerLogVm: _.map(init.CrawlerLogVm, x => x ? new VizVmWernickeLogEntry(x) : null),
      RegionedLine: init.RegionedLine ? new VizVmRegionedLine(init.RegionedLine) : null,
      RegionedLineNoOverlap: init.RegionedLineNoOverlap ? new VizVmRegionedLineNoOverlap(init.RegionedLineNoOverlap) : null,
      TransformationResults: _.map(init.TransformationResults, x => x ? new WernickeTransformationResultVM(x) : null),
      StructWernRules: init.StructWernRules ? new WernRulesStructure(init.StructWernRules) : null,
      StructWernTrans: init.StructWernTrans ? new WernTransStructure(init.StructWernTrans) : null,
      AnalysisPass2RuleSets: _.map(init.AnalysisPass2RuleSets, x => x ? new VizVmAnalysisWernRuleSet(x) : null),
      RuleSuggestions: _.map(init.RuleSuggestions, x => x ? new WernRuleSuggestion(x) : null),
      AnalysisPass3: init.AnalysisPass3 ? new VizVmAnalysisPass3(init.AnalysisPass3) : null,
      AnalysisNlgList: _.map(init.AnalysisNlgList, x => x ? new VizVmAnalysisNLGEntry(x) : null),
      AnalysisSuccessRate: init.AnalysisSuccessRate ? new VizVmAnalysisSuccessRate(init.AnalysisSuccessRate) : null,
      TestCasesVm: init.TestCasesVm ? new VizVmTestCases(init.TestCasesVm) : null,
      TestCaseConflictVm: init.TestCaseConflictVm ? new VizVmTestCaseResult(init.TestCaseConflictVm) : null,
      Debug_P1SeedEntries: _.map(init.Debug_P1SeedEntries, x => x ? new VizVmDebug_PhraseAndItsSplits(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmAnalysisNLGEntry
 */
export class VizVmAnalysisNLGEntry {
  Text: string;
  Pass3SourcePosition: WordHighlight;

  constructor(init?: Partial<VizVmAnalysisNLGEntry>) {
    Object.assign(this, init, {
      Pass3SourcePosition: init.Pass3SourcePosition ? new WordHighlight(init.Pass3SourcePosition) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmAnalysisPass3
 */
export class VizVmAnalysisPass3 {
  Pass3Rules: VizVmAnalysisWernRule[];
  Pass3RulesCount: number;
  Pass3RulesUsed: number;
  Pass3RulesUnused: number;
  SamplesWithMatches: number;
  SamplesSuccess: number;
  SamplesTotal: number;

  constructor(init?: Partial<VizVmAnalysisPass3>) {
    Object.assign(this, init, {
      Pass3Rules: _.map(init.Pass3Rules, x => x ? new VizVmAnalysisWernRule(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmAnalysisSampleMatch
 */
export class VizVmAnalysisSampleMatch {
  Id: string;
  Fragment: string;
  Prefix: string;
  Postfix: string;
  IsPrefixStartOfLine: boolean;
  IsPostfixEndOfLine: boolean;

  constructor(init?: Partial<VizVmAnalysisSampleMatch>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmAnalysisSuccessRate
 */
export class VizVmAnalysisSuccessRate {
  SamplesTotal: number;
  SamplesSuccess: number;

  constructor(init?: Partial<VizVmAnalysisSuccessRate>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmAnalysisWernRule
 */
export class VizVmAnalysisWernRule {
  RuleTemplate: WernickeTemplate;
  UsageType: VizVmAnalysisPass3RuleUsageType;
  MatchedSamples: VizVmAnalysisSampleMatch[];

  constructor(init?: Partial<VizVmAnalysisWernRule>) {
    Object.assign(this, init, {
      RuleTemplate: init.RuleTemplate ? new WernickeTemplate(init.RuleTemplate) : null,
      UsageType: isNaN(init.UsageType) ? VizVmAnalysisPass3RuleUsageType[init.UsageType] : init.UsageType,
      MatchedSamples: _.map(init.MatchedSamples, x => x ? new VizVmAnalysisSampleMatch(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmAnalysisWernRuleSet
 */
export class VizVmAnalysisWernRuleSet {
  Name: string;
  Pass2RuleSets: VizVmAnalysisWernRule[];

  constructor(init?: Partial<VizVmAnalysisWernRuleSet>) {
    Object.assign(this, init, {
      Pass2RuleSets: _.map(init.Pass2RuleSets, x => x ? new VizVmAnalysisWernRule(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmAsyncProgress
 */
export class VizVmAsyncProgress {
  Progress: number;
  Total: number;

  constructor(init?: Partial<VizVmAsyncProgress>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmCrawlLogAttempt
 */
export class VizVmCrawlLogAttempt {
  Id: any;
  Success: boolean;
  Offset: number;
  ChainMain: VizVmLogWernickeCharToken[];
  ChainRemainder: VizVmLogWernickeCharToken[];
  SourcePosition: WernScriptLocation;
  SuccessNotes: string[];

  constructor(init?: Partial<VizVmCrawlLogAttempt>) {
    Object.assign(this, init, {
      ChainMain: _.map(init.ChainMain, x => x ? new VizVmLogWernickeCharToken(x) : null),
      ChainRemainder: _.map(init.ChainRemainder, x => x ? new VizVmLogWernickeCharToken(x) : null),
      SourcePosition: init.SourcePosition ? new WernScriptLocation(init.SourcePosition) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmDebug_PhraseAndItsSplits
 */
export class VizVmDebug_PhraseAndItsSplits {
  Text: string;
  SubPhrasesConcat: string;
  SubPhrases: string[];

  constructor(init?: Partial<VizVmDebug_PhraseAndItsSplits>) {
    Object.assign(this, init, {
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmError
 */
export class VizVmError {
  Title: string;
  Message: string;
  CodeText: string;
  ErrorLocation: WernScriptLocation;

  constructor(init?: Partial<VizVmError>) {
    Object.assign(this, init, {
      ErrorLocation: init.ErrorLocation ? new WernScriptLocation(init.ErrorLocation) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmLogWernickeCharToken
 */
export class VizVmLogWernickeCharToken {
  Text: string;
  RuleName: string;
  SourcePosition: WernScriptLocation;

  constructor(init?: Partial<VizVmLogWernickeCharToken>) {
    Object.assign(this, init, {
      SourcePosition: init.SourcePosition ? new WernScriptLocation(init.SourcePosition) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmPleaseWait
 */
export class VizVmPleaseWait {
  Title: string;
  Message: string;
  Progress: VizVmAsyncProgress;

  constructor(init?: Partial<VizVmPleaseWait>) {
    Object.assign(this, init, {
      Progress: init.Progress ? new VizVmAsyncProgress(init.Progress) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmRegionedLine
 */
export class VizVmRegionedLine {
  Text: string;
  Regions: VizVmTextRegion[];

  constructor(init?: Partial<VizVmRegionedLine>) {
    Object.assign(this, init, {
      Regions: _.map(init.Regions, x => x ? new VizVmTextRegion(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmRegionedLineNoOverlap
 */
export class VizVmRegionedLineNoOverlap {
  Id: string;
  Text: string;
  RegionsPass3: VizVmTextRegionPass3[];
  RegionsPass2NonOverlapping: VizVmTextRegion[];

  constructor(init?: Partial<VizVmRegionedLineNoOverlap>) {
    Object.assign(this, init, {
      RegionsPass3: _.map(init.RegionsPass3, x => x ? new VizVmTextRegionPass3(x) : null),
      RegionsPass2NonOverlapping: _.map(init.RegionsPass2NonOverlapping, x => x ? new VizVmTextRegion(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmTestCaseResult
 */
export class VizVmTestCaseResult {
  IsSuccess: boolean;
  Text: string;
  ResultExpected: string[];
  ResultActual: VizVmTestCaseResultOutputItem[];

  constructor(init?: Partial<VizVmTestCaseResult>) {
    Object.assign(this, init, {
      ResultActual: _.map(init.ResultActual, x => x ? new VizVmTestCaseResultOutputItem(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmTestCaseResultOutputItem
 */
export class VizVmTestCaseResultOutputItem {
  Text: string;
  SourcePosition: WernScriptLocation;

  constructor(init?: Partial<VizVmTestCaseResultOutputItem>) {
    Object.assign(this, init, {
      SourcePosition: init.SourcePosition ? new WernScriptLocation(init.SourcePosition) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmTestCases
 */
export class VizVmTestCases {
  Cases: VizVmTestCaseResult[];
  TcCount: number;
  TcCountPassed: number;
  TcCountFailed: number;

  constructor(init?: Partial<VizVmTestCases>) {
    Object.assign(this, init, {
      Cases: _.map(init.Cases, x => x ? new VizVmTestCaseResult(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmTextRegion
 */
export class VizVmTextRegion {
  Level: number;
  RegionType: VizVmTextRegionType;
  Start: number;
  Span: number;
  Notes: string;
  SourcePosition: WernScriptLocation;

  constructor(init?: Partial<VizVmTextRegion>) {
    Object.assign(this, init, {
      RegionType: isNaN(init.RegionType) ? VizVmTextRegionType[init.RegionType] : init.RegionType,
      SourcePosition: init.SourcePosition ? new WernScriptLocation(init.SourcePosition) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmTextRegionPass3
 */
export class VizVmTextRegionPass3 extends VizVmTextRegion {
  InnerPass2Regions: VizVmTextRegion[];
  Pass3Results: WernickeTransformationResultVM[];

  constructor(init?: Partial<VizVmTextRegionPass3>) {
    super(init);
    Object.assign(this, {
      InnerPass2Regions: _.map(init.InnerPass2Regions, x => x ? new VizVmTextRegion(x) : null),
      Pass3Results: _.map(init.Pass3Results, x => x ? new WernickeTransformationResultVM(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.VizVmWernickeLogEntry
 */
export class VizVmWernickeLogEntry {
  Type: VizVmWernickeLogEntryType;
  Text: string;
  SubText: string;
  CrawlStartOffset: number;
  CrawlAttempt: VizVmCrawlLogAttempt;
  RegionedLine: VizVmRegionedLine;
  RegionedLineNoOverlap: VizVmRegionedLineNoOverlap;

  constructor(init?: Partial<VizVmWernickeLogEntry>) {
    Object.assign(this, init, {
      Type: isNaN(init.Type) ? VizVmWernickeLogEntryType[init.Type] : init.Type,
      CrawlAttempt: init.CrawlAttempt ? new VizVmCrawlLogAttempt(init.CrawlAttempt) : null,
      RegionedLine: init.RegionedLine ? new VizVmRegionedLine(init.RegionedLine) : null,
      RegionedLineNoOverlap: init.RegionedLineNoOverlap ? new VizVmRegionedLineNoOverlap(init.RegionedLineNoOverlap) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernickeRuleEntry
 */
export class WernickeRuleEntry {
  Template: WernickeTemplate;
  InlineValue: string;

  constructor(init?: Partial<WernickeRuleEntry>) {
    Object.assign(this, init, {
      Template: init.Template ? new WernickeTemplate(init.Template) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernickeRuleSet
 */
export class WernickeRuleSet {
  Name: string;
  IsLocalCluster: boolean;
  Rules: WernickeRuleEntry[];

  constructor(init?: Partial<WernickeRuleSet>) {
    Object.assign(this, init, {
      Rules: _.map(init.Rules, x => x ? new WernickeRuleEntry(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernickeTemplate
 */
export class WernickeTemplate {
  SourcePosition: WernScriptLocation;
  Tokens: WernickeTemplateToken[];
  MarkedRegions: WordHighlight[];

  constructor(init?: Partial<WernickeTemplate>) {
    Object.assign(this, init, {
      SourcePosition: init.SourcePosition ? new WernScriptLocation(init.SourcePosition) : null,
      Tokens: _.map(init.Tokens, x => x ? new WernickeTemplateToken(x) : null),
      MarkedRegions: _.map(init.MarkedRegions, x => x ? new WordHighlight(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernickeTemplateToken
 */
export class WernickeTemplateToken {
  SourcePosition: WordHighlight;
  Type: WernickeTemplateTokenType;
  Text: string;
  IdNum: string;
  ParamRef: string;
  Uid: string;

  constructor(init?: Partial<WernickeTemplateToken>) {
    Object.assign(this, init, {
      SourcePosition: init.SourcePosition ? new WordHighlight(init.SourcePosition) : null,
      Type: isNaN(init.Type) ? WernickeTemplateTokenType[init.Type] : init.Type,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.WernickeTransformationResultVM
 */
export class WernickeTransformationResultVM {
  RawText: string;
  RawTextOriginal: string;
  RawJson: string;
  CliObj: CliDeepStruct;
  SourcePosition: WernScriptLocation;

  constructor(init?: Partial<WernickeTransformationResultVM>) {
    Object.assign(this, init, {
      CliObj: init.CliObj ? new CliDeepStruct(init.CliObj) : null,
      SourcePosition: init.SourcePosition ? new WernScriptLocation(init.SourcePosition) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernLeafPass3
 */
export class WernLeafPass3 {
  Input: WernickeTemplate;
  Output: WernickeTemplate[];
  NeedsStartOfLine: boolean;
  NeedsEndOfLine: boolean;
  SourcePosition: WernScriptLocation;

  constructor(init?: Partial<WernLeafPass3>) {
    Object.assign(this, init, {
      Input: init.Input ? new WernickeTemplate(init.Input) : null,
      Output: _.map(init.Output, x => x ? new WernickeTemplate(x) : null),
      SourcePosition: init.SourcePosition ? new WernScriptLocation(init.SourcePosition) : null,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernRulesStructure
 */
export class WernRulesStructure {
  RuleSets: WernickeRuleSet[];
  RuleDefMap: { [id: string]: number; };

  constructor(init?: Partial<WernRulesStructure>) {
    Object.assign(this, init, {
      RuleSets: _.map(init.RuleSets, x => x ? new WernickeRuleSet(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.ViewModels.WernRuleSuggestion
 */
export class WernRuleSuggestion {
  RuleInput: string;
  RuleOutput: string;
  HasStartOfLine: boolean;
  HasEndOfLine: boolean;
  Samples: VizVmAnalysisSampleMatch[];
  NOccurence: number;

  constructor(init?: Partial<WernRuleSuggestion>) {
    Object.assign(this, init, {
      Samples: _.map(init.Samples, x => x ? new VizVmAnalysisSampleMatch(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernScriptLocation
 */
export class WernScriptLocation {
  WernScriptType: WernickeScriptType;
  Start: number;
  Length: number;

  constructor(init?: Partial<WernScriptLocation>) {
    Object.assign(this, init, {
      WernScriptType: isNaN(init.WernScriptType) ? WernickeScriptType[init.WernScriptType] : init.WernScriptType,
    });
  }
}

/**
 * Source class: Wernicke.Grammar.Structures.WernTransStructure
 */
export class WernTransStructure {
  Entries: WernLeafPass3[];

  constructor(init?: Partial<WernTransStructure>) {
    Object.assign(this, init, {
      Entries: _.map(init.Entries, x => x ? new WernLeafPass3(x) : null),
    });
  }
}

/**
 * Source class: Wernicke.Common.Models.WordHighlight
 */
export class WordHighlight {
  StartIndex: number;
  Length: number;

  constructor(init?: Partial<WordHighlight>) {
    Object.assign(this, init, {
    });
  }
}


//========================================================================================

@Injectable()
export class ExopService {
  
  public readonly setVisualizationVM:Subject<VisualizationVM> = new Subject<VisualizationVM>();
  public readonly setQueryText:Subject<string> = new Subject<string>();
  public readonly updateAsyncOpVM:Subject<AsyncOpWindowVM> = new Subject<AsyncOpWindowVM>();

  constructor(
    private ngZone: NgZone,
  ) {
    window['exinvoke_setVisualizationVM'] = (vm:VisualizationVM) => {
      this.ngZone.run(() => {
        vm = vm ? new VisualizationVM(vm) : null;
        this.setVisualizationVM.next(vm);
      });
    };
    
    window['exinvoke_setQueryText'] = (query:string) => {
      this.ngZone.run(() => {
        query = query;
        this.setQueryText.next(query);
      });
    };
    
    window['exinvoke_updateAsyncOpVM'] = (vm:AsyncOpWindowVM) => {
      this.ngZone.run(() => {
        vm = vm ? new AsyncOpWindowVM(vm) : null;
        this.updateAsyncOpVM.next(vm);
      });
    };
  }

  //--------------------------------------------------------------------------------------

  readonly exinvokerGlobalName:string = 'exinvoker';

  
  exinvoke_chromiumContentLoaded() {
    if (!window[this.exinvokerGlobalName]) {
      console.error(`${this.exinvokerGlobalName} has not been globally set for this chromium control! Failed to call ${this.exinvokerGlobalName}.chromiumContentLoaded`, );
      return;
    }
    window[this.exinvokerGlobalName].chromiumContentLoaded();
  }
  
  exinvoke_goToSourcePosition(data:WernScriptLocation) {
    if (!window[this.exinvokerGlobalName]) {
      console.error(`${this.exinvokerGlobalName} has not been globally set for this chromium control! Failed to call ${this.exinvokerGlobalName}.goToSourcePosition`, data);
      return;
    }
    window[this.exinvokerGlobalName].goToSourcePosition(data);
  }
  
  exinvoke_goToSampleById(id:string) {
    if (!window[this.exinvokerGlobalName]) {
      console.error(`${this.exinvokerGlobalName} has not been globally set for this chromium control! Failed to call ${this.exinvokerGlobalName}.goToSampleById`, id);
      return;
    }
    window[this.exinvokerGlobalName].goToSampleById(id);
  }
  
  exinvoke_addTestCase(query:string) {
    if (!window[this.exinvokerGlobalName]) {
      console.error(`${this.exinvokerGlobalName} has not been globally set for this chromium control! Failed to call ${this.exinvokerGlobalName}.addTestCase`, query);
      return;
    }
    window[this.exinvokerGlobalName].addTestCase(query);
  }
  
  exinvoke_updateTestCase(query:string) {
    if (!window[this.exinvokerGlobalName]) {
      console.error(`${this.exinvokerGlobalName} has not been globally set for this chromium control! Failed to call ${this.exinvokerGlobalName}.updateTestCase`, query);
      return;
    }
    window[this.exinvokerGlobalName].updateTestCase(query);
  }
  
  exinvoke_runQuery(query:string) {
    if (!window[this.exinvokerGlobalName]) {
      console.error(`${this.exinvokerGlobalName} has not been globally set for this chromium control! Failed to call ${this.exinvokerGlobalName}.runQuery`, query);
      return;
    }
    window[this.exinvokerGlobalName].runQuery(query);
  }
  
  exinvoke_queryTextChanged(query:string) {
    if (!window[this.exinvokerGlobalName]) {
      console.error(`${this.exinvokerGlobalName} has not been globally set for this chromium control! Failed to call ${this.exinvokerGlobalName}.queryTextChanged`, query);
      return;
    }
    window[this.exinvokerGlobalName].queryTextChanged(query);
  }

}