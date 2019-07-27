import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {API} from '../consts/API';
import {MemeCoin} from '../model/MemeCoin';
import {Observable} from 'rxjs/Observable';
import {Page} from '../model/Page';

@Injectable()
export class MemeCoinsApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public history(page, size, sort): Observable<Page<MemeCoin[]>> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http
      .get<Page<MemeCoin[]>>(API.MEME_COINS_HITORY, {headers, params})
      .pipe();
  }
}
