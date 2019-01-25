import {Injectable} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {Statistic} from '../model/Statistic';

@Injectable()
export class StatisticApiService {

  constructor() {
  }

  global(): Statistic {
    return new Statistic(228, 3, 69);
  }

  memetick(id: UUID): Statistic {
    return new Statistic(666, 666, 666);
  }

}
