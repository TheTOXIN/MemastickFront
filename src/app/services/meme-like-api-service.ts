import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MemeLike} from '../model/MemeLike';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';

@Injectable()
export class MemeLikeApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public read(memeId: UUID): Observable<MemeLike> {
    return this.http
      .get<MemeLike>(API.MEME_LIKES_READ + '/' + memeId)
      .pipe();
  }

}
