import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {UUID} from 'angular2-uuid';
import {MemotypeMemetick} from '../model/memotype/MemotypeMemetick';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MemotypeApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public all(): Observable<MemotypeMemetick> {
    return this.http
      .get<MemotypeMemetick>(API.MEMOTYPE_ALL)
      .pipe();
  }

  public read(memetickId: UUID): Observable<MemotypeMemetick> {
    return this.http
      .get<MemotypeMemetick>(API.MEMOTYPE_READ + '/' + memetickId)
      .pipe();
  }

  public collection(): Observable<MemotypeMemetick> {
    return this.http
      .get<MemotypeMemetick>(API.MEMOTYPE_COLLECTION)
      .pipe();
  }

  public buy(memotypeId: UUID) {
    return this.http
      .get<MemotypeMemetick>(API.MEMOTYPE_BUY + '/' + memotypeId)
      .pipe();
  }
}
