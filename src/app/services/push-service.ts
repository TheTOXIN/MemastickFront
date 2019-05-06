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
      console.log('Push not supported');
    }

    this.currentMessage = new BehaviorSubject(null);
  }

  permission() {
    if (this.messaging == null) { return; }
    this.messaging.requestPermission()
      .then(() => {
        console.log('Push permission granted');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.update(token);
      })
      .catch((err) => {
        console.log('Push permission error', err);
      });
  }

  update(token) {
    this.http.post(
      API.NOTIFY_PUSH_REGISTER,
      token
    ).toPromise();
  }

  receive() {
    if (this.messaging == null) { return; }
    this.messaging.onMessage((payload) => {
      console.log('Push received', payload);
      this.currentMessage.next(payload);
    });
  }
}
