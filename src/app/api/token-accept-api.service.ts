import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {TokenType} from '../consts/TokenType';
import {API} from '../consts/API';

@Injectable()
export class TokenAcceptApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  accept(memeId: UUID, token: TokenType) {
    return this.http
      .patch(API.TOKEN_ACCEPT + '/token/' + token + '/meme/' + memeId, {})
      .pipe();
  }
}
