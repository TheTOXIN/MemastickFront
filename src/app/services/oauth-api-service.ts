import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import { HttpHeaders } from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class OauthApiService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {

  }

  public login(username, password) {
    const params = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
    params.append('client_id', 'memastick-client');

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('memastick-client:memastick-secret')
    });

    const options = {
      headers: headers
    };

    return this.http.post(
      API.OAUTH_TOKEN,
      params.toString(),
      options
    ).pipe();
  }

  public logout() {
    Cookie.delete('access_token');
    this.router.navigateByUrl('/start');
  }

  public saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
  }

  public checkToken() {
    if (!Cookie.check('access_token')) {
      this.router.navigateByUrl('/start');
    }
  }

}
