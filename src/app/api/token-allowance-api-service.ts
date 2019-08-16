import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenAllowanceApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public take(): Observable<any> {
    return this.http
      .patch(API.ALLOWANCE_TAKE,{})
      .pipe();
  }

  public make() {
    return this.http
      .post(API.ALLOWANCE_MAKE, {})
      .pipe();
  }

  public have() {
    return this.http
      .get(API.ALLOWANCE_HAVE)
      .pipe();
  }
}
