import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs';
import {Memetick} from '../model/Memetick';
import {MemetickPreview} from '../model/MemetickPreview';
import {UUID} from 'angular2-uuid';


@Injectable()
export class MemetickApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public me(): Observable<Memetick> {
    return this.http
      .get<Memetick>(API.MEMETICK_VIEW_ME)
      .pipe();
  }

  public view(id: UUID): Observable<Memetick> {
    return this.http
      .get<Memetick>(API.MEMETICK_VIEW + '/' + id)
      .pipe();
  }

  public preview(id: UUID): Observable<MemetickPreview> {
    return this.http
      .get<MemetickPreview>(API.MEMETICK_PREVIEW + '/' + id)
      .pipe();
  }

  public changeNick(nick: String) {
    return this.http
      .put(API.MEMETICK_NICK_CHANE, {nick: nick})
      .pipe();
  }

}
