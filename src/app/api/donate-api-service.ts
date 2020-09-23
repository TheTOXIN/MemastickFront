import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DonateMessage} from '../model/donate/DonateMessage';
import {API} from '../consts/API';

@Injectable()
export class DonateApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public readRating(): Observable<any> {
    return this.http
      .get<any>(API.DONATE_READ_RATING)
      .pipe();
  }

  public randomMessage(): Observable<DonateMessage> {
    return this.http
      .get<DonateMessage>(API.DONATE_RANDOM_MESSAGE)
      .pipe();
  }

  public readMessages(): Observable<DonateMessage[]> {
    return this.http
      .get<DonateMessage[]>(API.DONATE_READ_MESSAGE)
      .pipe();
  }
}
