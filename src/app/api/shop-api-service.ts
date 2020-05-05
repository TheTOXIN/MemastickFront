import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {TokenType} from '../consts/TokenType';

@Injectable()
export class ShopApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  cookies(count: number) {
    return this.http
      .post(`${API.SHOP_COOKIES}/${count}`, {})
      .pipe();
  }

  tokens(type: TokenType, count: number) {
    return this.http
      .post(`${API.SHOP_TOKENS}/${type}/${count}`, {})
      .pipe();
  }
}
