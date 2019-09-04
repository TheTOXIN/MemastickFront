import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {API} from '../consts/API';
import {tap} from 'rxjs/operators';
import {PushService} from './push-service';
import {StorageService} from './storage-service';
import {User} from '../model/User';
import {AppComponent} from '../app.component';
import {WebSocketService} from './web-socket-service';

@Injectable()
export class OauthApiService {

  public statuses = [];

  private keyAccess = 'access_token_meme';
  private keyRefresh = 'refresh_token_meme';

  public accessTime = 3600;
  public refreshTime = 2592000;

  constructor(
    private router: Router,
    private http: HttpClient,
    private push: PushService,
    private storageService: StorageService,
    private socket: WebSocketService
  ) {
    this.initStatuses();
  }

  public login(username, password) {
    console.log('TOKEN');

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

    return this.http
      .post(API.OAUTH_TOKEN, params.toString(), options)
      .pipe(tap(data => {
        this.saveToken(data);
        this.saveMe();
      }),
    );
  }

  public refresh() {
    console.log('REFRESH');

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
    );
  }

  public logout() {
    console.log('SECURITY_LOGOUT');

    if (this.push.work()) {
      this.push.tokener().then(token => {
        this.http.post(API.SECURITY_LOGOUT, {deviceToken: token}).toPromise();
        this.logoutProcess();
      });
    } else {
      this.logoutProcess();
    }

    this.socket.disconnect();
  }

  private logoutProcess() {
    this.clearData();
    this.toStart();
  }

  private clearData() {
    Cookie.delete(this.keyAccess);
    Cookie.delete(this.keyRefresh);

    this.storageService.clearLogOut();
  }

  private toStart() {
    this.router.navigateByUrl('/start');
  }

  public saveToken(token) {
    const dateAccess = new Date();
    const dateRefresh = new Date();

    dateAccess.setSeconds(dateAccess.getSeconds() + this.accessTime);
    dateRefresh.setSeconds(dateRefresh.getSeconds() + this.refreshTime);

    Cookie.set(this.keyAccess, token.access_token, dateAccess, '/');

    if (!Cookie.check(this.keyRefresh)) {
      Cookie.set(this.keyRefresh, token.refresh_token, dateRefresh, '/');
    }
  }

  public saveMe() {
    this.http.get<User>(API.USER_ME).subscribe(data => {
      this.storageService.setMe(data);
    });
  }

  public addAuthorization(req: HttpRequest<any>, token: any) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  public readToken() {
    return Cookie.get(this.keyAccess);
  }

  public checkTokens() {
    return Cookie.check(this.keyAccess) || Cookie.check(this.keyRefresh);
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
