import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {API} from '../consts/API';
import {tap} from 'rxjs/operators';

@Injectable()
export class OauthApiService {

  public statuses = [];

  private keyAccess = 'access_token_meme';
  private keyRefresh = 'refresh_token_meme';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.initStatuses();
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
    ).pipe(
      tap(data => this.saveToken(data))
    );
  }

  public refresh() {
    const params = new URLSearchParams();

    params.append('refresh_token', Cookie.get(this.keyRefresh));
    params.append('grant_type', 'refresh_token');
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
    ).pipe(
      tap(data => this.saveToken(data))
    );
  }

  public logout() {
    Cookie.delete(this.keyAccess);
    Cookie.delete(this.keyRefresh);
    this.router.navigateByUrl('/start');
  }

  public saveToken(token) {
    const dateAccess = new Date();
    const dateRefresh = new Date();

    dateAccess.setSeconds(dateAccess.getSeconds() + token.expires_in);
    dateRefresh.setSeconds(dateRefresh.getSeconds() + token.expires_in * 24 * 7);

    Cookie.set(this.keyAccess, token.access_token, dateAccess, '/');
    Cookie.set(this.keyRefresh, token.refresh_token, dateRefresh, '/');
  }

  public expireToken() {
    return !Cookie.check(this.keyAccess);
  }

  public readToken() {
    return Cookie.get(this.keyAccess);
  }

  private initStatuses() {
    this.statuses['SUCCESSFUL'] = 'Успешная операция!';
    this.statuses['ERROR'] = 'Ошибка операции!';
    this.statuses['PASSWORD_WEAK'] = 'Слабый или неподходящий пароль';
    this.statuses['PASSWORD_REPEAT'] = 'Неверно  подтвержден пароль';
    this.statuses['LOGIN_EXIST'] = 'Логин уже занят';
    this.statuses['EMAIL_EXIST'] = 'Почта уже используется';
    this.statuses['LOGIN_INVALID'] = 'Некорректный логин';
    this.statuses['EMAIL_INVALID'] = 'Некорректная почта';
    this.statuses['INVITE'] = 'Инвайт-код не действителен';
  }

}
