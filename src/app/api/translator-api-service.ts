import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {UUID} from 'angular2-uuid';

@Injectable()
export class TranslatorApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public dayPublish(memeId: UUID) {
    this.http
      .post(API.DAY_TRANSLATE, {id: memeId})
      .toPromise();
  }

  public adminPublish(memeId: UUID) {
    this.http
      .post(API.ADMIN_TRANSLATE, {id: memeId})
      .toPromise();
  }

  public userPublish(memeId: UUID) {
    return this.http
      .post(API.USER_TRANSLATE, {id: memeId})
      .pipe();
  }
}
