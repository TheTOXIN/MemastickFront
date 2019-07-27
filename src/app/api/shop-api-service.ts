import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class ShopApiService {

  constructor(
    private http: HttpClient
  ) {
  }
  
  test(count: number) {
    return this.http
      .post(API.SHOP_TEST + '/' + count, {})
      .pipe();
  }
}
