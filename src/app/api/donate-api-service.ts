import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../consts/API';
import {DonateRating} from '../donate/model/DonateRating';
import {DonateMessage} from '../donate/model/DonateMessage';
import {Donate} from '../donate/model/Donate';

@Injectable()
export class DonateApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public read(): Observable<Donate> {
    return this.http
      .get<Donate>(API.DONATE_READ)
      .pipe();
  }

  public readRating(): Observable<DonateRating[]> {
    return this.http
      .get<any>(API.DONATE_READ_RATING)
      .pipe();
  }

  public readMessages(): Observable<DonateMessage[]> {
    return this.http
      .get<DonateMessage[]>(API.DONATE_READ_MESSAGE)
      .pipe();
  }
}
