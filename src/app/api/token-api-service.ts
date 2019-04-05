import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs/Observable';
import {TokenType} from '../consts/TokenType';
import {UUID} from 'angular2-uuid';

@Injectable()
export class TokenApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  memetick(memetickId: UUID): Observable<any> {
    return this.http
      .get(API.TOKENS_WALLETS_MEMETICK + '/' + memetickId)
      .pipe();
  }

  have(type: TokenType): Observable<any> {
    return this.http
      .post(API.TOKENS_WALLETS_HAVE, { type: type })
      .pipe();
  }
}
