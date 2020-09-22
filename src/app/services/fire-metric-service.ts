import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {StorageService} from './storage-service';
import {UUID} from 'angular2-uuid';

@Injectable()
export class FireMetricService {

  constructor(
    private fire: AngularFirestore,
    private storage: StorageService
  ) {

  }

  public event(type: string) {
    if (this.storage.isMetricEvent()) {
      const me = this.storage.getMe();
      const user = me != null ? me.memetickId + '' : UUID.UUID();

      this.fire.collection('/metrics-' + type).doc(user).set({
        type: type,
        user: user,
        date: new Date(),
      }).then();
    }
  }
}
