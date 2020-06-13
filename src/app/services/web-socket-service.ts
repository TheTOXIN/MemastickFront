import {EventEmitter, Injectable} from '@angular/core';
import {API} from '../consts/API';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {HttpClient} from '@angular/common/http';
import {Notify} from '../model/Notify';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BACK_URL} from '../app.constants';
import {ChatMessage} from '../model/chat/ChatMessage';

@Injectable()
export class WebSocketService {

  public connectEvent: EventEmitter<Boolean>;

  public notiferBehavior: BehaviorSubject<Notify>;
  public notiferObservable: Observable<Notify>;

  public chaterBehavior: BehaviorSubject<ChatMessage>;
  public chaterObservable: Observable<ChatMessage>;

  private stomp: any;
  public isConnect: boolean = false;

  constructor(
    private http: HttpClient
  ) {
    this.connectEvent = new EventEmitter(false);

    this.notiferBehavior = new BehaviorSubject(null);
    this.notiferObservable = this.notiferBehavior.asObservable();

    this.chaterBehavior = new BehaviorSubject(null);
    this.chaterObservable = this.chaterBehavior.asObservable();

    this.stomp = Stomp.over(new SockJS(BACK_URL + `/socket`));
  }

  public connect() {
    this.stomp.connect({}, () => {
      const url = this.stomp.ws._transport.url;
      const array = url.split('/');

      const id = array[array.length - 2];
      this.register(id);

      this.isConnect = true;
      this.connectEvent.emit(true);
    });
  }

  public disconnect() {
    if (this.stomp != null) {
      this.isConnect = false;
      this.stomp.disconnect();
    }
  }

  public unsubscribe(id: string) {
    this.stomp.unsubscribe(id);
  }

  public send(path: string, data: ChatMessage) {
    this.stomp.send('/app' + path, {}, JSON.stringify(data));
  }

  public register(id: string) {
    this.http
      .put(API.NOTIFY_WEB_REGISTER, id)
      .toPromise();
  }

  public notifer() {
    this.stomp.subscribe(
      '/user/queue/notify',
      data => this.notiferBehavior.next(<Notify>JSON.parse(data.body))
    );
  }

  public chater() {
    this.stomp.subscribe(
      '/chat/main',
      data => this.chaterBehavior.next(<ChatMessage>JSON.parse(data.body)),
      {id: 'chatId'}
    );
  }
}
