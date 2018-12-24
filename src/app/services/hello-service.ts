import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class HelloService {

  private URL = 'https://memastick-back.herokuapp.com';
  private API = '/hello';

  constructor(private http: Http) {}

  public sendHello() {
    this.http
      .get(this.URL + this.API)
      .toPromise()
      .then(response => console.log(response));
  }

}
