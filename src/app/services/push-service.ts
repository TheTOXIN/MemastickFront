import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase';
import {PushApiService} from '../api/push-api-service';

@Injectable()
export class PushService {

  private messaging;
  private currentMessage;

  constructor(
    private pushApi: PushApiService,
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
      this.pushApi.register(token);
    });
  }

  tokener() {
    return this.messaging.getToken();
  }

  work() {
    return this.messaging != null;
  }
}
