import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {GlobalConst} from '../consts/GlobalConst';

@Injectable()
export class MemetickAvatarApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public dowloadAvatar(memetickId: UUID): string {
    return GlobalConst.BACK_URL + API.MEMETICK_AVATAR_DOWNLOAD + '/' + memetickId;
  }

  public uploadAvatar(file: File) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http
      .post(API.MEMETICK_AVATAR_UPLOAD, uploadData)
      .pipe();
  }
}
