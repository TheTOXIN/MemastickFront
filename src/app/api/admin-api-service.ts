import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {Observable} from 'rxjs';

@Injectable()
export class AdminApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public notifyMessage(text: string, days: number): Observable<any> {
    return this.http
      .patch(API.ADMIN_MESSAGE + '/' + days, text)
      .pipe();
  }

  public notifyAll(text: string): Observable<any> {
    return this.http
      .patch(API.ADMIN_NOTIFY, text)
      .pipe();
  }

  public notifyUser(text: string, uuid: string): Observable<any> {
    return this.http
      .patch(API.ADMIN_NOTIFY + '/' + uuid, text)
      .pipe();
  }
}
