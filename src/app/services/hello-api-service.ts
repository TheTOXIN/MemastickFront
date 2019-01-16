import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HelloApiService {

  private API = '/hello';

  constructor(
    private http: HttpClient,
  ) {

  }

  public sendHello() {
    this.http
      .get(
        this.API,
        {responseType: 'text'}
      )
      .toPromise()
      .then(response => console.log(response))
      .catch(() => console.log('WTF'));
  }

}

