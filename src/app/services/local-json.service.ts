import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { WernickeMovieVM } from 'app/models/movie-vm';


@Injectable()
export class LocalJsonDataService {

  readonly SampleDebugVm = '/assets/debug-vm.json'; // NOTE: use this if you want to test mock json locally

  constructor(
    private http: HttpClient,
  ) { }

  private resolveWithJsonFile<T>(instantiator: (new (T) => T), filename: string): Promise<T> {
    return this.http
      .get<T>(filename)
      .toPromise()
      .then(response => response ? new instantiator(response) : null);
  }

  private resolveWithJsonFile_array<T>(instantiator: (new (T) => T), filename: string): Promise<T[]> {
    return this.http
      .get<T[]>(filename)
      .toPromise()
      .then(response => _.map(response, item => item ? new instantiator(item) : null));
  }

  public getSampleDebugVM(): Promise<WernickeMovieVM> {
    return this.resolveWithJsonFile(WernickeMovieVM, this.SampleDebugVm);
  }

}
