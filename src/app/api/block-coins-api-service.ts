import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../consts/API';

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

  public flushBlock() {
    return this.http
      .put(API.BLOCK_COINS_FLUSH, {})
      .pipe();
  }
}
