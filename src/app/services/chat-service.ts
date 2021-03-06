import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs';
import {ChatMessage} from '../model/chat/ChatMessage';
import {ChatConnect} from '../model/chat/ChatConnect';

@Injectable()
export class ChatService {

  constructor(
    private http: HttpClient
  ) {

  }

  public connect(): Observable<ChatConnect> {
    return this.http.get<ChatConnect>(API.CHAT_CONNECT).pipe();
  }

  public read(page: number, size: number): Observable<ChatMessage[]> {
    const params = new HttpParams()
      .set('sort', 'creating,desc')
      .set('page', page + '')
      .set('size', size + '');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http.get<ChatMessage[]>(API.CHAT_MESSAGES, {headers, params}).pipe();
  }

  public delete(number: number) {
    this.http.delete(`${API.CHAT_MESSAGES}/${number}`).toPromise();
  }
}
