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

  public adminPublish(memeId: UUID) {
    this.http
      .post(API.ADMIN_TRANSALTE ,{id: memeId})
      .toPromise();
  }

  public userPublish(memeId: UUID) {
    return this.http
      .post(API.USER_TRANSLATE, {id: memeId})
      .pipe();
  }
}
