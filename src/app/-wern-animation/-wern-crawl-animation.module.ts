import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MyCommonControlsModule } from 'app/-common-controls/-common-controls.module';
import { CommonWernickeModule } from 'app/-common-wernicke/-common-wernicke.module';
import { MyPipesModule } from 'app/-pipes/-pipes.module';

import { VmMappingService_WernAnimation } from './-models-services/vm-mapping-wern-animation.service';
import { CrawlAttemptBranchingComponent } from './crawl-attempt-branching/crawl-attempt-branching.component';
import { CrawlAttemptBranching2Component } from './crawl-attempt-branching2/crawl-attempt-branching2.component';
import { CrawlLog1frameComponent } from './crawl-log-1frame/crawl-log-1frame.component';
import { CrawlLogRegionedLineNoOverlapComponent } from './crawl-log-regioned-line-no-overlap/crawl-log-regioned-line-no-overlap.component';
import { LogAnimatedComponent } from './log-animated/log-animated.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonWernickeModule,
    MyCommonControlsModule,
    MyPipesModule,
  ],
  declarations: [
    LogAnimatedComponent,
    CrawlLog1frameComponent,
    CrawlAttemptBranchingComponent,
    CrawlAttemptBranching2Component,
    CrawlLogRegionedLineNoOverlapComponent,
  ],
  exports: [
    LogAnimatedComponent,
    // CrawlLog1frameComponent,
    // CrawlAttemptBranchingComponent,
    // CrawlAttemptBranching2Component,
    // CrawlLogRegionedLineNoOverlapComponent,
  ],
  providers: [
    VmMappingService_WernAnimation
  ]
})
export class WernCrawlAnimationModule { }
