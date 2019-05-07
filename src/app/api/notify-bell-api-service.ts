import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotifyBell} from '../model/NotifyBell';
import {Observable} from 'rxjs';
import {API} from '../consts/API';
import {UUID} from 'angular2-uuid';

@Injectable()
export class NotifyBellApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public readAll(): Observable<NotifyBell[]> {
    return this.http
      .get<NotifyBell[]>(API.NOTIFY_BELL_READ)
      .pipe();
  }

  public mark(id: UUID) {
    this.http
      .patch(API.NOTIFY_BELL_MARK + '/' + id, {})
      .toPromise();
  }

  public clearAll() {
    this.http
      .delete(API.NOTIFY_BELL_CLEAR)
      .toPromise();
  }

  public clear(id: UUID) {
    this.http
      .delete(API.NOTIFY_BELL_CLEAR + '/' + id)
      .toPromise();
  }
}
