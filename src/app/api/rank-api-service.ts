import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs';
import {RankType} from '../model/rank/RankType';
import {RankToken} from '../model/rank/RankToken';

@Injectable()
export class RankApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getRankTypes(): Observable<RankType[]> {
    return this.http
      .get<RankType[]>(API.RANK_TYPES)
      .pipe();
  }

  public getRankTokens(): Observable<RankToken[]> {
    return this.http
      .get<RankToken[]>(API.RANK_TOKENS)
      .pipe();
  }
}
