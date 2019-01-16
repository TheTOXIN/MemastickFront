import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {URLS} from '../consts/URLS';
import {Cookie} from 'ng2-cookies';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  private URL: String = URLS.API_URL;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: this.URL + req.url,
      setHeaders: {
        Authorization: `Bearer ${Cookie.get('access_token')}`
      }
    });
    return next.handle(req);
  }

}
