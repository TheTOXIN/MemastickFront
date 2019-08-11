import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../consts/API';
import {UUID} from 'angular2-uuid';

@Injectable()
export class BlockCoinsApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public makeBlock(): Observable<any> {
    return this.http
      .get<any>(API.BLOCK_COINS_MAKE)
      .pipe();
  }

  public mineBlock(nonce: number) {
    return this.http
      .patch(API.BLOCK_COINS_MINE,  {'nonce': nonce})
      .pipe();
  }

  public flushBlock(token: UUID) {
    return this.http
      .put(API.BLOCK_COINS_FLUSH + '/' + token, {})
      .pipe();
  }
}
