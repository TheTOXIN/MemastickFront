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
import {flatMap} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private URL: String = API.BASE_URL;

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
    // TODO это нельзя оставить просто так

    if (!this.anonymus.includes(req.url) && !req.url.startsWith(API.MEMES_READ)) {
      req = this.oauthApi.addAuthorization(req, this.oauthApi.readToken());
    }

    if (!req.url.startsWith('http')) {
      req = req.clone({ url: this.URL + req.url });
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('REFRESHER');
          return this.refresher(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private refresher(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      console.log('IS_REFRESH');
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.oauthApi.refresh().pipe(
        flatMap((data: any) => {
          console.log('REFRESH_MAP');
          this.tokenSubject.next(data.access_token);
          this.oauthApi.saveToken(data);
          return next.handle(this.oauthApi.addAuthorization(req, data.access_token));
        }),
        catchError(err => {
          console.log('REFRESH_ERROR');
          this.oauthApi.logout();
          return throwError(err);
        }),
        finalize(() => {
          console.log('REFRESH FINALIZE');
          this.isRefreshingToken = false;
          return next.handle(req);
        })
      );
    } else {
      console.log('NOT_REFRESH');
      this.isRefreshingToken = false;
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
