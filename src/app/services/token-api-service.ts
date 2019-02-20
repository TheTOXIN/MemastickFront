import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs/Observable';
import {TokenType} from '../consts/TokenType';

@Injectable()
export class TokenApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  my(): Observable<any> {
    return this.http
      .get(API.TOKENS_WALLETS_MY)
      .pipe();
  }

  have(type: TokenType): Observable<any> {
    return this.http
      .post(API.TOKENS_WALLETS_HAVE, { type: type })
      .pipe();
  }
}
