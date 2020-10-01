import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs';
import {UUID} from 'angular2-uuid';
import {MemetickRatingFilter} from '../consts/MemetickRatingFilter';
import {Memetick} from '../model/memetick/Memetick';
import {MemetickProfile} from '../model/memetick/MemetickProfile';
import {MemetickPreview} from '../model/memetick/MemetickPreview';
import {MemetickRating} from '../model/memetick/MemetickRating';


@Injectable()
export class MemetickApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public read(id: UUID): Observable<Memetick> {
    return this.http
      .get<Memetick>(API.MEMETICK_READ + id)
      .pipe();
  }

  public profileMe(): Observable<MemetickProfile> {
    return this.http
      .get<MemetickProfile>(API.MEMETICK_PROFILE_ME)
      .pipe();
  }

  public profile(id: UUID): Observable<MemetickProfile> {
    return this.http
      .get<MemetickProfile>(API.MEMETICK_PROFILE + id)
      .pipe();
  }

  public list(memetickIds: UUID[]): Observable<MemetickPreview[]> {
    return this.http
      .post<MemetickPreview[]>(API.MEMETICK_LIST, memetickIds)
      .pipe();
  }

  public changeNick(nick: String, force: boolean) {
    return this.http
      .put(API.MEMETICK_NICK_CHANE, {nick: nick, force: force})
      .pipe();
  }

  public rating(filter: MemetickRatingFilter): Observable<MemetickRating> {
    return this.http
      .get<MemetickRating>(API.MEMETICK_RATING + '/' + filter)
      .pipe();
  }

  public creedAgree() {
    this.http
      .patch(API.MEMETICK_CREED, {})
      .toPromise();
  }
}
