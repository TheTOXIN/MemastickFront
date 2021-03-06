import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {API} from '../consts/API';
import {tap} from 'rxjs/operators';
import {PushService} from './push-service';
import {StorageService} from './storage-service';
import {User} from '../model/User';
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
    private storageService: StorageService
  ) {

  }

  public login(username, password) {
    console.log('LOGIN');

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
        this.checkMe(username);
      }));
  }

  public refresh() {
    const refreshToken = Cookie.get(REFRESH_TOKEN_KEY);

    if (refreshToken == null || refreshToken === '') {
      return throwError(new Error('REFRESH IS NULL'));
    }

    console.log('REFRESH');

    const params = new URLSearchParams();

    params.append('refresh_token',  refreshToken);
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
    ).pipe();
  }

  public logout() {
    console.log('LOGOUT');

    this.push.tokener().subscribe((token) => {
      this.http.post(API.SECURITY_LOGOUT, {deviceToken: token}).subscribe(
        () => this.logoutProcess()
      );
    }, () => {
      this.logoutProcess();
    });
  }

  public logoutProcess() {
    if (!this.checkTokens()) { return; }
    console.log('LOGOUT PROCESS');

    Cookie.delete(ACCESS_TOKEN_KEY);
    Cookie.delete(REFRESH_TOKEN_KEY);

    this.storageService.clearLogOut();
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

  public checkMe(login: string) {
    const me = this.storageService.getMe();

    if (me == null || me.login !== login) {
      this.loadMe().then();
    }
  }

  public async readMe(): Promise<User> {
    const me = this.storageService.getMe();

    if (me != null) {
      return await me;
    } else {
      return await this.loadMe();
    }
  }

  private loadMe() {
    return this.http.get<User>(API.USER_ME).toPromise().then(data => {
      this.storageService.setMe(data);
      return data;
    });
  }

  public loadData(): Observable<UserData> {
    return this.http.get<UserData>(API.USER_DATA).pipe();
  }
}
