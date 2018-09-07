import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

import { CrawlLogFrameVM } from '../-models-services/crawl-log-frame-vm';
import { TextFragmentHighLevelVM } from 'app/-common-wernicke/models/word-rectangles-vm';
import { VmMappingService } from 'app/-common-wernicke/services/vm-mapping.service';
import { VmMappingService_WernAnimation } from '../-models-services/vm-mapping-wern-animation.service';

@Component({
  selector: 'my-crawl-log-1frame',
  templateUrl: './crawl-log-1frame.component.html',
  styleUrls: ['./crawl-log-1frame.component.less']
})
export class CrawlLog1frameComponent implements OnInit, OnChanges {

  @Input()
  vm: CrawlLogFrameVM;

  @Output()
  onAnimationFinished = new EventEmitter<void>();
  
  textPrefix: string;
  textPostfix: string;
  charrayText: string;

  fragmentsPrefix: TextFragmentHighLevelVM[];
  fragmentsPostfix: TextFragmentHighLevelVM[];
  isLastFrame: boolean = false;

  constructor(
    private mapServiceWAnim: VmMappingService_WernAnimation,
    private mapService: VmMappingService,
  ) { }

  ngOnInit() {}
  ngOnChanges() {
    if (this.vm.offset >= 0) {
      this.textPrefix = this.vm.text.substr(0, this.vm.offset);
      this.charrayText = this.vm.text.substr(this.vm.offset, this.vm.span);
      this.textPostfix = this.vm.text.substr(this.vm.offset + this.vm.span);
      let rlnoPrefix = this.mapServiceWAnim.sliceVizVmRegionedLineNoOverlap(this.vm.resultRL, 0, this.vm.offset);
      let rlnoPostfix = this.mapServiceWAnim.sliceVizVmRegionedLineNoOverlap(this.vm.resultRLprev, this.vm.offset + this.vm.span);
      this.fragmentsPrefix = this.mapService.map_VizVmRegionedLineNoOverlap_to_RectangledSentenceSimpleVM(rlnoPrefix);
      this.fragmentsPostfix = this.mapService.map_VizVmRegionedLineNoOverlap_to_RectangledSentenceSimpleVM(rlnoPostfix);
      this.isLastFrame = false;
    }
    else {
      this.textPrefix = this.vm.text;
      this.charrayText = null;
      this.textPostfix = '';
      this.fragmentsPrefix = this.mapService.map_VizVmRegionedLineNoOverlap_to_RectangledSentenceSimpleVM(this.vm.resultRL);
      this.fragmentsPostfix = null;
      this.isLastFrame = true;
      setTimeout(() => {
        this.onAnimationFinished.emit();
      }, 5000);
    }
  }

  

}

