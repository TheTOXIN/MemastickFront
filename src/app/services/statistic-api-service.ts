import {Injectable} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {Statistic} from '../model/Statistic';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StatisticApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  global(): Observable<Statistic> {
    return this.http
      .get<Statistic>(API.STATS_GLOBAL)
      .pipe();
  }

  memetick(id: UUID): Observable<Statistic> {
    return this.http
      .get<Statistic>(API.STATS_MEMETICK + '/' + id)
      .pipe();
  }

}
