import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class RankApiService {

  constructor(
    public http: HttpClient
  ) {

  }

  public getRankTypes() {
    return this.http
      .get(API.RANK_TYPES)
      .pipe();
  }

  public getRankTokens() {
    return this.http
      .get(API.RANK_TOKENS)
      .pipe();
  }
}
