import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {InviteCode} from '../model/InviteCode';
import {Observable} from 'rxjs/Observable';
import {map, switchMap} from 'rxjs/operators';

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

  public readInvites(): Observable<InviteCode[]> {
    return this.http
      .get<InviteCode[]>(API.INVITE_READ)
      .pipe();
  }

  public sendInvite(code: string) {
    this.http
      .patch(API.INVITE_SEND, '' + code + '')
      .toPromise();
  }
}
