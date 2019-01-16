import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InviteApiService {

  private API = '/invite/registration';

  constructor(private http: HttpClient) {}

  public sendInvite(email, nick) {
    this.http.post(
      this.API,
      {
        email: email,
        nick: nick
      }
    ).subscribe(() => {
      console.log('SEND INVITE: email = ' + email + ' nick = ' + nick);
    });
  }

}
