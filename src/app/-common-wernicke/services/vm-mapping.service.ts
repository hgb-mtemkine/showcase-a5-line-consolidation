import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import * as EXOP from 'gen/exop';
import { TcLevensteinComparisonItem } from 'app/-common-wernicke/models/tc-comparison';
import { WernickeCrawlEntryGroupVM, WernickeCrawlLogGroupedVM } from 'app/-common-wernicke/models/WernickeCrawlEntryGroup';
import { RectangledSentenceSimpleVM_obsolete, SentenceSegmentOutlineVm, SentenceSegmentsVm, SentenceSegmentVm, TextFragmentHighLevelVM } from 'app/-common-wernicke/models/word-rectangles-vm';

import { LevensteinService, LevensteinStringFragment, LevRegion } from './levenstein.service';



@Injectable()
export class VmMappingService {

  constructor(
    private levService: LevensteinService,
  ) { }

  map_VmRegionedLine_2_SentenceSegmentsVm(obj:EXOP.VizVmRegionedLine):SentenceSegmentsVm {
    // .... group by start
    let uniqueStartsStr = _.groupBy(obj.Regions, region => region.Start); // LESSON: group by makes key a string. thus need to parse it later
    let uniqueStarts = _.map(uniqueStartsStr, (subArray:EXOP.VizVmTextRegion[], curIndexStr:string) => <_intermediate_VmTextSplitPoint> {
      start: parseInt(curIndexStr),
      regions: subArray,
      minSpan: _.min(subArray.map(x => x.Span))
    });
    uniqueStarts = _.sortBy(uniqueStarts, x => x.start);
    // .... add closing split point
    uniqueStarts.push(<_intermediate_VmTextSplitPoint> {
      start: obj.Text.length,
      regions: [],
      minSpan: 0,
    });

    // .... add head, if missing. NOTE: unshift(x) prepends x to array
    if (uniqueStarts.length > 1 && uniqueStarts[0].start > 0)
      uniqueStarts.unshift(<_intermediate_VmTextSplitPoint> {
        start: 0,
        regions: [],
        minSpan: 0,
      });

    // .... club identical overlapping regions
    _.forEach(uniqueStarts, (group:_intermediate_VmTextSplitPoint) => {
      let regionsUnique: EXOP.VizVmTextRegion[] = [];
      _.forEach(group.regions, region => {
        let existing = regionsUnique.find(r => r.Start == region.Start && r.Span == region.Span)
        if (existing)
          existing.Notes += '/' + region.Notes;
        else
          regionsUnique.push(Object.assign({}, region));
      });
      group.regions = regionsUnique;
    });

    // .... populate segments array
    let segments:SentenceSegmentVm[] = [];
    let prevGroup:_intermediate_VmTextSplitPoint = null;

    _.forEach(uniqueStarts, (group:_intermediate_VmTextSplitPoint) => {
      // .... add head, if missing
      if (group.start > 0 && prevGroup == null)
        segments.push(<SentenceSegmentVm> {
          originalText: obj.Text.substring(0, group.start),
          outlines: []
        });
      
      if (prevGroup != null) {
        let complexSegment = <SentenceSegmentVm> {
          originalText: obj.Text.substring(prevGroup.start, group.start), // NOTE: because of the "closing split point" added above, this will take care of the tail
          outlines: []
        };
        _.forEach(prevGroup.regions, region => {
          complexSegment.outlines.push(<SentenceSegmentOutlineVm> {
            ex_region: region,
            text: obj.Text.substr(prevGroup.start, region.Span), // LESSON: substr vs substring: substr(from,length), substring(start,end)
            cssLevelClass: 'level-' + region.Level,
            comment: region.Notes,
          });
        });
        segments.push(complexSegment);
      }

      prevGroup = group;
    });

    return <SentenceSegmentsVm> {
      segments: segments
    };
  }

  map_tc_to_levensteinComparison(tc: EXOP.VizVmTestCaseResult): TcLevensteinComparisonItem[] {
    let comparisonItems: TcLevensteinComparisonItem[] = [];
    for (let i = 0; i < tc.ResultActual.length; i++) {
      if (i < tc.ResultActual.length && i < tc.ResultExpected.length)
        comparisonItems.push(<TcLevensteinComparisonItem> {
          expected: tc.ResultExpected[i],
          actual: tc.ResultActual[i].Text,
          actualSP: tc.ResultActual[i].SourcePosition,
        });
      else if (i < tc.ResultActual.length)
        comparisonItems.push(<TcLevensteinComparisonItem> {
          expected: '',
          actual: tc.ResultActual[i].Text,
          actualSP: tc.ResultActual[i].SourcePosition,
        });
      else if (i < tc.ResultExpected.length)
        comparisonItems.push(<TcLevensteinComparisonItem> {
          expected: tc.ResultExpected[i],
          actual: '',
          actualSP: null,
        });
    }
    for (let i = 0; i < comparisonItems.length; i++) {
      let levensteinData = this.levService.computeLevensteinDiff(comparisonItems[i].expected, comparisonItems[i].actual);
      comparisonItems[i].expectedRogue = levensteinData.rogueIndicesA;
      comparisonItems[i].actualRogue = levensteinData.rogueIndicesB;
    }
    
    return comparisonItems;
  }

  // TODO: 46bde4cc: obsolete
  map_LevensteinStringFragment_to_RectangledSentenceSimpleVM_obsolete(
    levFrag: LevensteinStringFragment,
    sourceRegions:EXOP.VizVmTextRegion[]
  ): RectangledSentenceSimpleVM_obsolete  {
    if (levFrag.sourceIndex < 0)
      return <RectangledSentenceSimpleVM_obsolete> {
        text: levFrag.text,
        isMatch: false,
        isPass3Match: false,
        isPass2Match: false,
        isNoop: false,
      };
    let sourceRegion = sourceRegions[levFrag.sourceIndex];
    return <RectangledSentenceSimpleVM_obsolete> {
      text: levFrag.text,
      sourceRegion: sourceRegion,
      notes: sourceRegion.Notes,
      isMatch: levFrag.isRogue,
      isPass2Match: sourceRegion.RegionType == EXOP.VizVmTextRegionType.Pass2Match,
      isPass3Match: sourceRegion.RegionType == EXOP.VizVmTextRegionType.Pass3Match,
      isNoop: sourceRegion.RegionType == EXOP.VizVmTextRegionType.Noop,
      isOutputValid: true,
    }
  }

  map_VizVmRegionedLineNoOverlap_to_RectangledSentenceSimpleVM(vm: EXOP.VizVmRegionedLineNoOverlap):TextFragmentHighLevelVM[] {
    let allRegionsTopLevelSorted = _.sortBy(
      _.union(
        vm.RegionsPass3,
        vm.RegionsPass2NonOverlapping,
      ),
      x => x.Start
    );
    let fragmentsTopLevel = this.map_VizVmTextRegions_to_TextFragmentHighLevelVMs_oneLevel(vm.Text, allRegionsTopLevelSorted);
    fragmentsTopLevel.forEach(fff => {
      if (_.includes(vm.RegionsPass3, fff.sourceRegion)) {
        fff.sourceRegionPass3 = fff.sourceRegion as EXOP.VizVmTextRegionPass3;
        fff.innerFragments = this.map_VizVmTextRegions_to_TextFragmentHighLevelVMs_oneLevel(fff.text, fff.sourceRegionPass3.InnerPass2Regions);
      }
    });
    return fragmentsTopLevel;
  }

  map_VizVmTextRegions_to_TextFragmentHighLevelVMs_oneLevel(sss: string, regionsSorted: EXOP.VizVmTextRegion[]): TextFragmentHighLevelVM[] {
    let levRegions = _.map(regionsSorted, r => <LevRegion> {
      start: r.Start,
      span: r.Span,
    });
    // NOTE: b59ab92e: offset feature was decided not to be used because backend returns InnerPass2Regions with "Start" property relative to that Pass3 top-level region.
    //                 This makes WebView slightly simpler for the time being.
    //let levFragmentsTopLevel = this.levService.stringWithRegionsToFragments(sss, levRegions, offset);
    let levFragmentsTopLevel = this.levService.stringWithRegionsToFragments(sss, levRegions);
    let fragments = _.map(levFragmentsTopLevel, levFrag => {
      if (levFrag.sourceIndex < 0)
        return <TextFragmentHighLevelVM> { text: levFrag.text };
      let sourceRegion = regionsSorted[levFrag.sourceIndex];
      return <TextFragmentHighLevelVM> {
        text: levFrag.text,
        sourceRegion: sourceRegion,
      };
    });
    return fragments;
  }

  group_WernickeCrawlEntries(vm: EXOP.VizVmWernickeLogEntry[]): WernickeCrawlLogGroupedVM {
    let prefixEntries: EXOP.VizVmWernickeLogEntry[] = [];
    let groups: WernickeCrawlEntryGroupVM[] = [];
    let curGroup: WernickeCrawlEntryGroupVM = null;
    for (let i = 0; i < vm.length; i++) {
      if (vm[i].Type == EXOP.VizVmWernickeLogEntryType.GroupHeading) {
        curGroup = <WernickeCrawlEntryGroupVM> {
          title: vm[i].Text,
          entries: [],
          detailsHidden: true,
        };
        groups.push(curGroup);
        continue;
      }
      if (!curGroup)
        prefixEntries.push(vm[i]);
      else
        curGroup.entries.push(vm[i]);
    }
    return <WernickeCrawlLogGroupedVM> {
      prefixEntries: prefixEntries,
      groups: groups,
    }
  }
}




class _intermediate_VmTextSplitPoint {
  start: number;
  minSpan: number; // TODO: get rid of minSpan
  regions:EXOP.VizVmTextRegion[];
}