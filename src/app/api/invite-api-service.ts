import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {InviteCode} from '../model/InviteCode';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InviteApiService {

  constructor(private http: HttpClient) {}

  public regInvite(email, nick) {
    return this.http.post(
      API.INVITE_REGISTRATION,
      {
        email: email,
        nick: nick
      }
    );
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
