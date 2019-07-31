import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API} from '../consts/API';
import {OauthApiService} from '../services/oauth-api-service';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {BACK_URL} from '../app.constants';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private URL: String = BACK_URL;

  private anonymus: Array<String> = [
    API.OAUTH_TOKEN,
    API.HELLO,
    API.INVITE_REGISTRATION,
    API.REGISTRATION,
    API.PASSWORD_RESET_SEND,
    API.PASSWORD_RESET_TAKE
  ];

  constructor(
    private oauthApi: OauthApiService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.anonymus.includes(req.url) && !req.url.startsWith(API.MEMES_IMG)) {
      req = this.oauthApi.addAuthorization(req, this.oauthApi.readToken());
    }

    if (!req.url.startsWith('http')) {
      req = req.clone({ url: this.URL + req.url });
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.refresher(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private refresher(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.oauthApi.refresh().pipe(
        switchMap((data: any) => {
          this.tokenSubject.next(data.access_token);
          this.oauthApi.saveToken(data);
          return next.handle(this.oauthApi.addAuthorization(req, data.access_token));
        }),
        catchError(err => {
          if (!req.url.includes(API.SECURITY_LOGOUT)) { this.oauthApi.logout(); }
          return throwError(err);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
          return next.handle(req);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.oauthApi.addAuthorization(req, token));
        })
      );
    }
  }
}
