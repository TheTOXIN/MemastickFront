import {Injectable} from '@angular/core';
import {API} from '../consts/API';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WebSocketService {

  constructor(
    private http: HttpClient
  ) {

  }

  public connect() {
    const socket = new SockJS(API.BASE_URL + `/socket`);
    const stompClient = Stomp.over(socket);

    return stompClient;
  }

  public register(id: string) {
    this.http
      .put(API.NOTIFY_REGISTER, id)
      .toPromise();
  }
}
