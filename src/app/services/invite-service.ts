import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class InviteService {

  private URL = 'https://memastick-back.herokuapp.com';
  private API = '/invite/registration';

  constructor(private http: Http) {}

  public sendInvite(email, nick) {
    this.http.post(
      this.URL + this.API,
      {
        email: email,
        nick: nick
      }
    ).subscribe(() => {
      console.log('SEND INVITE: email = ' + email + ' nick = ' + nick);
    });
  }

}
