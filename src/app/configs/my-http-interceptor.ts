import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API} from '../consts/API';
import {tap} from 'rxjs/operators';
import {OauthApiService} from '../services/oauth-api-service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

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
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.oauthApi.readToken()}`
        }
      });
    }

    if (!req.url.startsWith('http')) {
      req = req.clone({
        url: this.URL + req.url,
      });
    }

    return next.handle(req).pipe(tap(
      () => {},
      (error) => {
        if (error.status === 401) {
          this.oauthApi.refresh().pipe().subscribe(
            () => {
              return next.handle(this.oauthApi.addAuthorization(req)).toPromise().then(() => window.location.reload());
            },
            () => {
              this.oauthApi.logout();
            }
          );
        }
      }
    ));
  }
}
