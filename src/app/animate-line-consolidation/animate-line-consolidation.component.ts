import { Component, OnInit, Input } from '@angular/core';
import { LineConsolidationLog } from 'app/models/log-vm';

@Component({
  selector: 'blah-animate-line-consolidation',
  templateUrl: './animate-line-consolidation.component.html',
  styleUrls: ['./animate-line-consolidation.component.less']
})
export class AnimateLineConsolidationComponent implements OnInit {

  @Input()
  vm: LineConsolidationLog;

  constructor() { }

  ngOnInit() {
  }

}
