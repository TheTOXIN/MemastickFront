import {Injectable} from '@angular/core';
import {API} from '../consts/API';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {HttpClient} from '@angular/common/http';
import {Notify} from '../model/Notify';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BACK_URL} from '../app.constants';
import {StorageService} from './storage-service';
import {NotifyCountEvent} from '../model/NotifyCountEvent';

@Injectable()
export class WebSocketService {

  private stomp: any;

  public notiferBehavior: BehaviorSubject<Notify>;
  public notiferObservable: Observable<Notify>;

  public counterBehavior: BehaviorSubject<NotifyCountEvent>;
  public counterObservable: Observable<NotifyCountEvent>;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
    this.notiferBehavior = new BehaviorSubject(null);
    this.notiferObservable = this.notiferBehavior.asObservable();

    this.counterBehavior = new BehaviorSubject(null);
    this.counterObservable = this.counterBehavior.asObservable();
  }

  public connect() {
    this.stomp = Stomp.over(new SockJS(BACK_URL + `/socket`));

    this.stomp.connect({}, () => {
      const url = this.stomp.ws._transport.url;
      const array = url.split('/');

      const id = array[array.length - 2];
      this.register(id);

      this.notifer();
      this.counter();
    });
  }

  public disconnect() {
    if (this.stomp != null) {
      this.stomp.disconnect();
    }
  }

  public register(id: string) {
    this.http
      .put(API.NOTIFY_WEB_REGISTER, id)
      .subscribe(() => this.storage.setSockReg());
  }

  public notifer() {
    this.stomp.subscribe(
      '/user/queue/notify',
        data => this.notiferBehavior.next(<Notify>JSON.parse(data.body))
    );
  }

  public counter() {
    this.stomp.subscribe(
      '/user/queue/notify-count',
      data => this.counterBehavior.next(<NotifyCountEvent>JSON.parse(data.body))
    );
  }
}
