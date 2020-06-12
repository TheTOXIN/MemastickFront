import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class ChatService {

  constructor(
    private http: HttpClient
  ) {

  }

  public read() {

  }

  public delete(number: number) {
    this.http.delete(`${API.CHAT_MESSAGE}/${number}`).toPromise();
  }
}
