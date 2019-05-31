import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {PasswordApiService} from '../api/password-api-service';
import {PushApiService} from '../api/push-api-service';

@Injectable()
export class PushService {

  private messaging;
  private currentMessage;

  constructor(
    private pushApi: PushApiService
  ) {
    try {
      this.messaging = firebase.messaging();
    } catch (e) {
      console.log('Push not supported');
    }

    this.currentMessage = new BehaviorSubject(null);
  }

  requester() {
    if (this.messaging == null) { return; }

    this.messaging.requestPermission()
      .then(() => console.log('Push permission granted'))
      .then(() => this.register())
      .catch((err) => console.log('Push permission error', err));
  }

  register() {
    if (this.messaging == null) { return; }

    this.messaging.getToken().then((token) => {
      if (token == null) { return; }
      console.log('Push token register - ' + token);
      this.pushApi.register(token);
    });
  }
}
