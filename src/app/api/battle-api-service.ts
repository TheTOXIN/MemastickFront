import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BattleView} from '../model/battle/BattleView';
import {BattlePreview} from '../model/battle/BattlePreview';
import {UUID} from 'angular2-uuid';
import {BattleResult} from '../model/battle/BattleResult';
import {BattleRating} from '../model/battle/BattleRating';
import {API} from '../consts/API';
import {BattleVote} from '../model/battle/BattleVote';
import {BattleRequest} from '../model/battle/BattleRequest';
import {BattleResponse} from '../model/battle/BattleResponse';

@Injectable()
export class BattleApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public home(): Observable<BattleView[]> {
    return this.http
      .get<BattleView[]>(API.BATTLE_HOME)
      .pipe();
  }

  public view(battleId: UUID): Observable<BattleView> {
    return this.http
      .get<BattleView>(API.BATTLE_VIEW + battleId)
      .pipe();
  }

  public preview(battleId: UUID): Observable<BattlePreview> {
    return this.http
      .get<BattlePreview>(API.BATTLE_PREVIEW + battleId)
      .pipe();
  }

  public list(): Observable<UUID> {
    return this.http
      .get<UUID[]>(API.BATTLE_LIST)
      .pipe();
  }

  public vote(data: BattleVote): Observable<BattleResult> {
    return this.http
      .patch<BattleResult>(API.BATTLE_VOTE, data)
      .pipe();
  }

  public request(data: BattleRequest) {
    return this.http
      .put(API.BATTLE_REQUEST, data)
      .pipe();
  }

  public response(data: BattleResponse) {
    return this.http
      .post(API.BATTLE_RESPONSE, data)
      .pipe();
  }

  public ratingMain(): Observable<BattleRating[]> {
    return this.http
      .get<BattleRating[]>(API.BATTLE_RATING_MAIN)
      .pipe();
  }

  public ratingMy(): Observable<BattleRating> {
    return this.http
      .get<BattleRating>(API.BATTLE_RATING_MY)
      .pipe();
  }
}
