import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API} from '../consts/API';
import {Cookie} from 'ng2-cookies';

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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.anonymus.includes(req.url)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${Cookie.get('access_token')}`
        }
      });
    }

    req = req.clone({
      url: this.URL + req.url,
    });

    return next.handle(req);
  }

}
