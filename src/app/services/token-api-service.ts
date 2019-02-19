import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs/Observable';

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
}
