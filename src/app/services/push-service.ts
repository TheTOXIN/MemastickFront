import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class PushService {

  private messaging;
  private currentMessage;

  constructor(
    private http: HttpClient
  ) {
    try {
      this.messaging = firebase.messaging();
    } catch (e) {
      console.log('Push not supported' + e);
    }

    this.currentMessage = new BehaviorSubject(null);
  }

  requester() {
    if (!this.work()) { return; }

    return this.messaging.requestPermission()
      .then(() => { this.register(); })
      .catch(() => alert('PUSH уведомления заблокированы'));
  }

  register() {
    if (!this.work()) { return; }

    this.messaging.getToken().then((token) => {
      if (token == null) { return; }
      console.log('Push token register - ' + token);

      this.http.post(
        API.NOTIFY_PUSH_REGISTER,
        token
      ).toPromise();
    });
  }

  tokener() {
    if (!this.work()) { return null; }
    return this.messaging.getToken();
  }

  work() {
    return this.messaging != null;
  }
}
