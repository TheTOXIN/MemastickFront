import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MemeLoh} from '../model/meme/MemeLoh';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';

@Injectable()
export class MemeLohApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public read(memeId: UUID): Observable<MemeLoh> {
    return this.http
      .get<MemeLoh>(`${API.MEME_LOH}/${memeId}`)
      .pipe();
  }
}
