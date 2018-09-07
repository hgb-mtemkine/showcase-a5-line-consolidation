import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as EXOP from 'gen/exop';

import { LevensteinService } from './services/levenstein.service';
import { VmMappingService } from './services/vm-mapping.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    EXOP.ExopService,
    LevensteinService,
    VmMappingService,
  ]
})
export class CommonWernickeModule { }
