import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {API} from '../consts/API';
import {tap} from 'rxjs/operators';
import {PushService} from './push-service';
import {StorageService} from './storage-service';
import {User} from '../model/User';
import {WebSocketService} from './web-socket-service';
import {UserData} from '../model/UserData';
import {Observable} from 'rxjs/Observable';
import {throwError} from 'rxjs';
import {ACCESS_TOKEN_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_KEY, REFRESH_TOKEN_TIME} from '../app.constants';

@Injectable()
export class OauthApiService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private push: PushService,
    private storageService: StorageService,
    private socket: WebSocketService
  ) {

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
      }));
  }

  public refresh() {
    console.log('REFRESH');

    const refreshToken = Cookie.get(REFRESH_TOKEN_KEY);

    if (refreshToken === null) {
      return throwError(new Error('REFRESH IS NULL'));
    }

    const params = new URLSearchParams();

    params.append('refresh_token', refreshToken);
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

    this.toStart();

    if (this.push.work()) {
      this.push.tokener().then(token => {
        this.http.post(API.SECURITY_LOGOUT, {deviceToken: token}).toPromise();
        this.clearData();
      });
    } else {
      this.clearData();
    }
  }

  private clearData() {
    Cookie.delete(ACCESS_TOKEN_KEY);
    Cookie.delete(REFRESH_TOKEN_KEY);

    this.storageService.clearLogOut();
  }

  private toStart() {
    this.router.navigateByUrl('/start');
  }

  public saveToken(token) {
    const dateAccess = new Date();
    const dateRefresh = new Date();

    dateAccess.setSeconds(dateAccess.getSeconds() + ACCESS_TOKEN_TIME);
    dateRefresh.setSeconds(dateRefresh.getSeconds() + REFRESH_TOKEN_TIME);

    Cookie.set(ACCESS_TOKEN_KEY, token.access_token, dateAccess, '/');

    if (!Cookie.check(REFRESH_TOKEN_KEY)) {
      Cookie.set(REFRESH_TOKEN_KEY, token.refresh_token, dateRefresh, '/');
    }
  }

  public addAuthorization(req: HttpRequest<any>, token: any) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  public readToken() {
    return Cookie.get(ACCESS_TOKEN_KEY);
  }

  public checkTokens() {
    return Cookie.check(ACCESS_TOKEN_KEY) || Cookie.check(REFRESH_TOKEN_KEY);
  }

  public loadMe() {
    this.readMe().subscribe(data => {
      this.storageService.setMe(data);
      console.log(data);
    });
  }

  public readMe(): Observable<User> {
    return this.http.get<User>(API.USER_ME).pipe();
  }

  public loadData(): Observable<UserData> {
    return this.http
      .get<UserData>(API.USER_DATA)
      .pipe();
  }
}
