import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs';
import {Memetick} from '../model/Memetick';
import {MemetickPreview} from '../model/MemetickPreview';
import {UUID} from 'angular2-uuid';
import {MemetickRatingFilter} from '../consts/MemetickRatingFilter';
import {MemetickRating} from '../model/MemetickRating';


@Injectable()
export class MemetickApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public viewMe(): Observable<Memetick> {
    return this.http
      .get<Memetick>(API.MEMETICK_VIEW_ME)
      .pipe();
  }

  public view(id: UUID): Observable<Memetick> {
    return this.http
      .get<Memetick>(API.MEMETICK_VIEW + '/' + id)
      .pipe();
  }

  public changeNick(nick: String) {
    return this.http
      .put(API.MEMETICK_NICK_CHANE, {nick: nick})
      .pipe();
  }

  public rating(filter: MemetickRatingFilter): Observable<MemetickRating> {
    return this.http
      .get<MemetickRating>(API.MEMETICK_RATING + '/' + filter)
      .pipe();
  }
}