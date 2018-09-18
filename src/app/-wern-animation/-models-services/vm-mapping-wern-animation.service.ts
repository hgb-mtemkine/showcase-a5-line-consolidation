import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import * as EXOP from 'gen/exop';

import { CrawlLogFrameVM } from './crawl-log-frame-vm';


@Injectable()
export class VmMappingService_WernAnimation {

  constructor(
  ) { }

  animate_WernickeCrawlEntries(vm: EXOP.VizVmWernickeLogEntry[]): CrawlLogFrameVM[] {
    let groups = this.animate_WernickeCrawlEntries_group(vm);
    let frames:CrawlLogFrameVM[] = [];
    let text1 = (groups && groups.length)
      ? groups[0].crawlStarts[0].start.Text
      : '';
    frames.push(<CrawlLogFrameVM>{
      text: text1,
      resultRL: <EXOP.VizVmRegionedLineNoOverlap> {
        Id: '---',
        Text: text1,
        RegionsPass3: [],
        RegionsPass2NonOverlapping: [],
      },
      resultRLprev: <EXOP.VizVmRegionedLineNoOverlap> {
        Id: '---',
        Text: text1,
        RegionsPass3: [],
        RegionsPass2NonOverlapping: [],
      },
      offset: 0,
      span: 0,
      convergeIndex: 0,
    });
    groups.forEach(group => {
      group.crawlStarts.forEach(crawlStart => {
        crawlStart.crawls.forEach(attempt => {
          var textChainMain = _.join(attempt.CrawlAttempt.ChainMain.map(x => x.Text), "");
          var textChainRem = _.join(attempt.CrawlAttempt.ChainRemainder.map(x => x.Text), "");
          var convergeIndexStart = textChainMain.length-1;
          if (attempt.CrawlAttempt.Success)
            convergeIndexStart = 0;
          for (let j = convergeIndexStart; j < textChainMain.length; j++) {
            frames.push(<CrawlLogFrameVM>{
              text: crawlStart.start.Text,
              resultRL: group.resultRL,
              resultRLprev: group.resultRLprev,
              // textOnBranch: textChainMain + textChainRem,
              branchRem: attempt.CrawlAttempt.ChainRemainder,
              offset: crawlStart.start.CrawlStartOffset,
              span: textChainMain.length,
              convergeIndex: j,
              isSuccess: attempt.CrawlAttempt.Success === true && j == textChainMain.length - 1,
              isFailure: attempt.CrawlAttempt.Success === false,
            });
          } 
        });
      });
    });
    let lastFrame = _.last(frames);
    frames.push(<CrawlLogFrameVM>{
      text: lastFrame.text,
      resultRL: lastFrame.resultRL,
      offset: -1,
      span: -1,
      convergeIndex: -1,
    });
    return frames;
  }

  sliceVizVmRegionedLineNoOverlap(vm: EXOP.VizVmRegionedLineNoOverlap, start: number, length?: number): EXOP.VizVmRegionedLineNoOverlap {
    if (length == undefined)
      length = vm.Text.length - start;
    return <EXOP.VizVmRegionedLineNoOverlap> {
      Text: vm.Text.substr(start, length),
      RegionsPass2NonOverlapping: vm.RegionsPass2NonOverlapping
        .filter(r => r.Start >= start && r.Start + r.Span <= start + length)
        .map(r => <EXOP.VizVmTextRegion> {
          Level: r.Level,
          Notes: r.Notes,
          RegionType: r.RegionType,
          SourcePosition: r.SourcePosition,
          Start: r.Start - start,
          Span: r.Span,
        }),
      RegionsPass3: vm.RegionsPass3
        .filter(r => r.Start >= start && r.Start + r.Span <= start + length)
        .map(r => <EXOP.VizVmTextRegionPass3> {
          Level: r.Level,
          Notes: r.Notes,
          RegionType: r.RegionType,
          SourcePosition: r.SourcePosition,
          Start: r.Start - start,
          Span: r.Span,
          InnerPass2Regions: r.InnerPass2Regions
            .filter(ri => ri.Start >= start && ri.Start + ri.Span <= start + length)
            .map(ri => <EXOP.VizVmTextRegion> {
              Level: ri.Level,
              Notes: ri.Notes,
              RegionType: ri.RegionType,
              SourcePosition: ri.SourcePosition,
              Start: ri.Start - start,
              Span: ri.Span,
            })
        }),
    }
  }

  //---------------------------------------------------------------------------------------------------
  
  private animate_WernickeCrawlEntries_group(vm: EXOP.VizVmWernickeLogEntry[]): _intermediate_WernCrawlAnimationGroup[] {
    let crawlEntries = vm.filter(x =>
      x.Type == EXOP.VizVmWernickeLogEntryType.CrawlAttempt ||
      x.Type == EXOP.VizVmWernickeLogEntryType.CrawlStart ||
      x.Type == EXOP.VizVmWernickeLogEntryType.RegionedLine);
    let groups: _intermediate_WernCrawlAnimationGroup[] = [];
    let curGroup = <_intermediate_WernCrawlAnimationGroup> {
      crawlStarts: [],
    };
    let lastStart: _intermediate_WernCrawlAnimationGroupCrawlStart = null;
    for (let i = 0; i < crawlEntries.length; i++) {
      const entry = crawlEntries[i];
      if (entry.Type == EXOP.VizVmWernickeLogEntryType.CrawlStart) {
        lastStart = <_intermediate_WernCrawlAnimationGroupCrawlStart> {
          start: entry,
          crawls: [],
        };
        curGroup.crawlStarts.push(lastStart);
        continue;
      }
      if (!lastStart)
        continue;
      if (entry.Type == EXOP.VizVmWernickeLogEntryType.CrawlAttempt)
        lastStart.crawls.push(entry);
      else if (entry.Type == EXOP.VizVmWernickeLogEntryType.RegionedLine) {
        curGroup.resultRL = entry.RegionedLineNoOverlap;
        if (!curGroup.resultRLprev)
          curGroup.resultRLprev = <EXOP.VizVmRegionedLineNoOverlap> {
            Text: entry.RegionedLineNoOverlap.Text,
            RegionsPass2NonOverlapping: [],
            RegionsPass3: [],
          };
        groups.push(curGroup);
        curGroup = <_intermediate_WernCrawlAnimationGroup> {
          crawlStarts: [],
          resultRLprev: entry.RegionedLineNoOverlap,
        };
      }
    }
    return groups;
  }
  
}

class _intermediate_WernCrawlAnimationGroup {
  crawlStarts: _intermediate_WernCrawlAnimationGroupCrawlStart[];
  resultRL: EXOP.VizVmRegionedLineNoOverlap;
  resultRLprev: EXOP.VizVmRegionedLineNoOverlap;
}
class _intermediate_WernCrawlAnimationGroupCrawlStart {
  start: EXOP.VizVmWernickeLogEntry;
  crawls: EXOP.VizVmWernickeLogEntry[];
}

