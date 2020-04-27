import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {TokenType} from '../consts/TokenType';
import {API} from '../consts/API';
import {TokenAccept} from '../model/tokens/TokenAccept';
import {MemeLoh} from '../model/meme/MemeLoh';

@Injectable()
export class TokenAcceptApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public acceptLoh(memeId: UUID, token: TokenType, loh: MemeLoh) {
    return this.accept(
      memeId, token,
      new TokenAccept(loh)
    );
  }

  public acceptComment(memeId: UUID, token: TokenType, comment: string) {
    return this.accept(
      memeId, token,
      new TokenAccept(null, comment)
    );
  }

  public accept(memeId: UUID, token: TokenType, body = new TokenAccept(null, null)) {
    return this.http
      .patch(`${API.TOKEN_ACCEPT}/token/${token}/meme/${memeId}`, body)
      .pipe();
  }
}
