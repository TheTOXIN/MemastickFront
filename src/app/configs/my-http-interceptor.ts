import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API} from '../consts/API';
import {tap} from 'rxjs/operators';
import {OauthApiService} from '../services/oauth-api-service';
import {Router} from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  private URL: String = API.BASE_URL;

  private anonymus: Array<String> = [
    API.OAUTH_TOKEN,
    API.HELLO,
    API.INVITE_REGISTRATION,
    API.REGISTRATION,
    API.PASSWORD_RESET_SEND,
    API.PASSWORD_RESET_TAKE,
  ];


  constructor(
    private oauthApi: OauthApiService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.anonymus.includes(req.url)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.oauthApi.readToken()}`
        }
      });
    }

    req = req.clone({
      url: this.URL + req.url,
    });

    return next.handle(req).pipe(tap(
      () => {
      },
      (error) => {
        if (error.status === 401 && this.oauthApi.expireToken()) {
          this.oauthApi.refresh().pipe().subscribe(
            () => window.location.reload(),
            () => this.router.navigateByUrl('/start')
          );
        }
      }
    ));
  }

}
