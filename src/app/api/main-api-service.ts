import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Home} from '../model/Home';
import {API} from '../consts/API';
import {Init} from '../model/Init';

@Injectable()
export class MainApiService {

  constructor(private http: HttpClient) {}

  public hello(): Observable<string> {
    return this.http
      .get(API.HELLO, {responseType: 'text'})
      .pipe();
  }

  public home(): Observable<Home> {
    return this.http
      .get<Home>(API.HOME)
      .pipe();
  }

  public init(): Observable<Init> {
    return this.http
      .get<Init>(API.INIT)
      .pipe();
  }
}
