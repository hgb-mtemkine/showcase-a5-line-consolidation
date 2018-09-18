import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import * as EXOP from 'gen/exop';

import { CrawlLogFrameVM } from '../-models-services/crawl-log-frame-vm';
import { VmMappingService_WernAnimation } from '../-models-services/vm-mapping-wern-animation.service';


@Component({
  selector: 'my-log-animated',
  templateUrl: './log-animated.component.html',
  styleUrls: ['./log-animated.component.less']
})
export class LogAnimatedComponent implements OnInit, OnChanges {

  @Input()
  vm: EXOP.VizVmWernickeLogEntry[];
  @Input()
  hideControls: boolean = false;
  @Input()
  autoStart: boolean = false;
  @Input()
  autoStartDelay: number = 0;
  @Input()
  frameDelay: number = 3;
  @Input()
  nSkipFrameFF: number = 15;
  @Input()
  slomoTimeoutMax: number = 50;

  @Output()
  onAnimationFinished = new EventEmitter<void>();
  
  public frames: CrawlLogFrameVM[];
  public frameIndex: number = 0;
  public playerThread: any;

  constructor(
    private exopUtils: EXOP.ExopService,
    private mapServiceWAnim: VmMappingService_WernAnimation,
  ) { }

  ngOnInit() {}
  ngOnChanges() {
    this.frames = this.mapServiceWAnim.animate_WernickeCrawlEntries(this.vm);
    this.frameIndex = 0;
    if (this.autoStart) {
      setTimeout(() => {
        this.startPlayback();
      }, this.autoStartDelay);
    }
  }

  incFrame(delta: number) {
    let newFrame = this.frameIndex + delta;
    if (newFrame < 0)
      newFrame = 0;
    if (newFrame >= this.frames.length)
      newFrame = this.frames.length - 1;
    this.frameIndex = newFrame;
  }

  startPlayback() {
    if (this.playerThread) {
      clearInterval(this.playerThread);
      this.playerThread = null;
      return;
    }

    //----------------- config --------------------
    const slowDownFrames = [
      Math.floor(0),
      Math.floor(this.frames.length / 4),
      Math.floor(3 * this.frames.length / 4),
      this.frames.length + 1000,
    ];
    //---------------------------------------------

    let slomoTimeout:number = null;
    let frameInc:number = this.nSkipFrameFF;
    let framesClozure = this.frames;
    let curSlowdownFrameIndex = 0;
    this.playerThread = setInterval(() => {
      if (this.frameIndex >= framesClozure.length - 1) {
        clearInterval(this.playerThread);
        this.playerThread = null;
        return;
      }
      if (this.frameIndex > slowDownFrames[curSlowdownFrameIndex]) {
        frameInc = 1;
        slomoTimeout = this.slomoTimeoutMax;
        curSlowdownFrameIndex++;
      }
      slomoTimeout--;
      if (slomoTimeout <= 0) {
        frameInc = this.nSkipFrameFF;
        slomoTimeout = null;
      }
      this.incFrame(frameInc);
    }, this.frameDelay);
  }

}
