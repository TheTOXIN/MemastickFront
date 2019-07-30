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

  public evolveMemeChance(memeId: UUID): Observable<number> {
    return this.http
      .get<number>(API.EVOLVE_MEME_CHANCE + '/' + memeId)
      .pipe();
  }

  public resurrectMeme(memeId: UUID) {
    return this.http
      .patch(API.EVOLVE_MEME_RESURRECT + '/' + memeId, {})
      .pipe();
  }
}
