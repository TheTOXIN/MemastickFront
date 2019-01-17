import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs';
import {Memetick} from '../model/Memetick';


@Injectable()
export class MemetickApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public me(): Observable<Memetick> {
    return this.http
      .get<Memetick>(API.MEMETICK_ME)
      .pipe();
  }

}
