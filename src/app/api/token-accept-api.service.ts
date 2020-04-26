import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {TokenType} from '../consts/TokenType';
import {API} from '../consts/API';
import {TokenAccept} from '../model/tokens/TokenAccept';

@Injectable()
export class TokenAcceptApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public accept(memeId: UUID, token: TokenType, body?: TokenAccept) {
    return this.http
      .patch(`${API.TOKEN_ACCEPT}/token/${token}/meme/${memeId}`, body)
      .pipe();
  }
}
