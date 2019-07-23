import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

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
}
