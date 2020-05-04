import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DonaterMessage} from '../model/donaters/DonaterMessage';
import {API} from '../consts/API';

@Injectable()
export class DonaterApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public readRating(): Observable<any> {
    return this.http
      .get<any>(API.DONATER_READ_RATING)
      .pipe();
  }

  public randomMessage(): Observable<DonaterMessage> {
    return this.http
      .get<DonaterMessage>(API.DONATER_RANDOM_MESSAGE)
      .pipe();
  }

  public readMessages(): Observable<DonaterMessage[]> {
    return this.http
      .get<DonaterMessage[]>(API.DONATER_READ_MESSAGE)
      .pipe();
  }
}
