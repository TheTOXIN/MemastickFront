import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {StorageService} from './storage-service';

import {AngularFireMessaging} from '@angular/fire/messaging';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PushService {

  public currentMessage = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private fireMessaging: AngularFireMessaging
  ) {
    // this.fireMessaging.messaging.subscribe((_messaging) => {
    //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    // });

    this.receiver();
    this.changer();
  }

  receiver() {
    // this.fireMessaging.messages.subscribe((payload) => {
    //   if (payload != null) {
    //     console.log('GET NEW PUSH', payload);
    //     this.currentMessage.next(payload);
    //   }
    // });
  }

  changer() {
    this.fireMessaging.tokenChanges.subscribe(token => {
      if (token != null) {
        console.log('TOKEN PUSH CHANGE', token);
        this.refresher(token);
      }
    });
  }

  public requester() {
    this.fireMessaging.requestPermission.subscribe(() => {
      this.register();
    }, () => {
      alert('PUSH уведомления заблокированы');
    });
  }

  public tokener() {
    return this.fireMessaging.getToken.pipe();
  }

  private register() {
    this.fireMessaging.getToken.subscribe(token => {
      if (token != null) {
        console.log('REG PUSH TOKEN' + token);
        this.storage.setPushToken(token);
        this.http.post(
          API.NOTIFY_PUSH_REGISTER,
          token
        ).toPromise();
      }
    });
  }

  private refresher(refreshToken) {
    const prevToken = this.storage.getPushToken();
    if (prevToken !== refreshToken) {
      this.storage.setPushToken(refreshToken);
      this.http.put(
        API.NOTIFY_PUSH_REFRESHER + '/' + prevToken,
        refreshToken
      ).toPromise();
    }
  }
}
