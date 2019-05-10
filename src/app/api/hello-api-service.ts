import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class HelloApiService {

  constructor(
    private http: HttpClient,
  ) {

  }

  public sendHello() {
    this.http
      .get(
        API.HELLO,
        {responseType: 'text'}
      )
      .toPromise()
      .then(response => console.log(response))
      .catch(() => console.log('WTF'));
  }

}

