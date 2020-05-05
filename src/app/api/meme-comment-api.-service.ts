import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {Observable} from 'rxjs';
import {MemeComment} from '../model/meme/MemeComment';
import {API} from '../consts/API';

@Injectable()
export class MemeCommentApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public readComments(memeId: UUID, sort: string): Observable<MemeComment[]> {
    const params = new HttpParams();
    params.set('sort', sort);

    return this.http
      .get<MemeComment[]>(`${API.MEME_COMMENT}/${memeId}`, {params})
      .pipe();
  }

  public voteComment(commentId: UUID, vote: boolean) {
    this.http
      .patch(`${API.MEME_COMMENT_VOTE}/${commentId}`, vote)
      .toPromise();
  }
}
