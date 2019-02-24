import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {EvolveMeme} from '../model/EvolveMeme';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EvolveMemeApiService {

  constructor(
    private http: HttpClient,
  ) {

  }

  public evolveMeme(memeId: UUID): Observable<EvolveMeme> {
    return this.http
      .get<EvolveMeme>(API.EVOLVE_MEME + '/' + memeId)
      .pipe();
  }
}
