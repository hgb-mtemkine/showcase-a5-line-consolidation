import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LineConsolidationLog } from 'app/models/log-vm';

@Component({
  selector: 'blah-animate-line',
  templateUrl: './animate-line.component.html',
  styleUrls: ['./animate-line.component.less']
})
export class AnimateLineComponent {

  @Input() vm: LineConsolidationLog;
  @Input()
  hideControls: boolean = false;
  @Input()
  autoPlay: boolean = false;
  @Input()
  autoStartDelay: number = 0;
  @Output()
  onAnimationFinished = new EventEmitter<void>();

  public curIndex: number;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.curIndex = 0;
  }
  
  
  mySceneFinishedHandler() { 
    if(this.autoPlay &&  this.curIndex < this.vm.snapshots.length-1){
      this.curIndex++;
    }
    else if (this.curIndex == this.vm.snapshots.length-1) {
      this.onAnimationFinished.emit();
    }
  }
  /**
   *  advance frame by 1
   * then fire emit 
   */
}