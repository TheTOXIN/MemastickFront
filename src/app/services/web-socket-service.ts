import {Injectable} from '@angular/core';
import {API} from '../consts/API';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {HttpClient} from '@angular/common/http';
import {GlobalConst} from '../consts/GlobalConst';
import {Notify} from '../model/Notify';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class WebSocketService {

  private stomp: any;

  public notiferBehavior: BehaviorSubject<Notify>;
  public notiferObservable: Observable<Notify>;

  constructor(
    private http: HttpClient
  ) {
    this.notiferBehavior = new BehaviorSubject(null);
    this.notiferObservable = this.notiferBehavior.asObservable();
  }

  public connect() {
    this.stomp = Stomp.over(new SockJS(GlobalConst.BACK_URL + `/socket`));

    this.stomp.connect({}, () => {
      const url = this.stomp.ws._transport.url;
      const array = url.split('/');
      const id = array[array.length - 2];

      this.register(id);
      this.notifer();
    });
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
}
