import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Home} from '../model/Home';
import {API} from '../consts/API';

@Injectable()
export class MainApiService {

  constructor(private http: HttpClient) {}

  public home(): Observable<Home> {
    return this.http
      .get<Home>(API.HOME)
      .pipe();
  }
}
