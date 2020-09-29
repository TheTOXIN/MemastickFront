import {EventEmitter, Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Notify} from '../model/Notify';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BACK_URL} from '../app.constants';
import {ChatMessage} from '../model/chat/ChatMessage';

@Injectable()
export class SocketService {

  public connectEvent: EventEmitter<Boolean>;

  public notiferBehavior: BehaviorSubject<Notify>;
  public notiferObservable: Observable<Notify>;

  public chaterBehavior: BehaviorSubject<ChatMessage>;
  public chaterObservable: Observable<ChatMessage>;

  private stomp: any;
  public isConnect: boolean = false;

  constructor() {
    this.connectEvent = new EventEmitter(false);

    this.notiferBehavior = new BehaviorSubject(null);
    this.notiferObservable = this.notiferBehavior.asObservable();

    this.chaterBehavior = new BehaviorSubject(null);
    this.chaterObservable = this.chaterBehavior.asObservable();
  }

  public connect(username: string) {
    if (this.isConnect || username == null) {
      return;
    }

    this.stomp = Stomp.over(new SockJS(BACK_URL + `/socket`));

    this.stomp.connect({username: username}, () => {
      this.isConnect = true;
      this.connectEvent.emit(true);
    }, (err) => {
      console.log('SOCKET ERROR', err);
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
