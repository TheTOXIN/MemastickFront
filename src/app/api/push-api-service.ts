import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class PushApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  register(token) {
    this.http.post(
      API.NOTIFY_PUSH_REGISTER,
      token
    ).toPromise();
  }

  unregister() {
    this.http.post(
      API.NOTIFY_PUSH_UNREGISTER,
      {}
    ).toPromise();
  }
}
