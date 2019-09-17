import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {BACK_URL} from '../app.constants';
import {StorageService} from '../services/storage-service';

@Injectable()
export class MemetickAvatarApiService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {

  }

  public dowloadAvatar(memetickId: UUID): string {
    let url = BACK_URL + API.MEMETICK_AVATAR_DOWNLOAD + '/' + memetickId;

    const me = this.storage.getMe();

    if (me != null && memetickId === me.memetickId) { url += '?cache=false'; }

    return url;
  }

  public uploadAvatar(file: File) {
    const uploadData = new FormData();

    uploadData.append('file', file);

    return this.http
      .post(API.MEMETICK_AVATAR_UPLOAD, uploadData)
      .pipe();
  }
}
