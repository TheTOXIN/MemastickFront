import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';

@Injectable()
export class AdminApiService {

  constructor(
    private http: HttpClient,
  ) {

  }

  public translate(memeId: UUID) {
    this.http
      .patch(API.ADMIN_TRANSALTE, {'id': memeId})
      .toPromise();
  }
}
