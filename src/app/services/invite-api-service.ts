import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class InviteApiService {


  constructor(private http: HttpClient) {}

  public sendInvite(email, nick) {
    this.http.post(
      API.INVITE_REGISTRATION,
      {
        email: email,
        nick: nick
      }
    ).subscribe(() => {
      console.log('SEND INVITE: email = ' + email + ' nick = ' + nick);
    });
  }

}
