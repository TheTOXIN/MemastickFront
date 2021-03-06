import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Setting} from '../model/Setting';
import {API} from '../consts/API';
import {UUID} from 'angular2-uuid';
import {MemetickPreview} from '../model/memetick/MemetickPreview';

@Injectable()
export class SettingApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public me(): Observable<Setting> {
    return this.http
      .get<Setting>(API.SEETING_ME)
      .pipe();
  }

  public push(value: boolean) {
    this.http
      .patch(API.SEETING_PUSH + '/' + value, {})
      .toPromise();
  }

  public follow(memetickId: UUID) {
    this.http
      .post(API.SEETING_FOLLOW + '/' + memetickId, {})
      .toPromise();
  }

  public following(): Observable<MemetickPreview[]> {
    return this.http
      .get<MemetickPreview[]>(API.SEETING_FOLLOW_MY)
      .pipe();
  }
}
