import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';

@Injectable()
export class MemeLikeApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public trigger(memeId: UUID) {
    this.http.patch(API.MEME_LIKES_TRIGGER + '/' + memeId, {}).toPromise();
  }

  public chromosome(memeId: UUID, count: number) {
    this.http.patch(API.MEME_LIKES_CHROMOSOME + '/' + memeId + '/' + count, {}).toPromise();
  }
}
