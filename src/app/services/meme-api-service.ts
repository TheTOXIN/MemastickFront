import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs/Observable';
import {MemePage} from '../model/MemePage';


@Injectable()
export class MemeApiService {

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
  ) {

  }

  public memeCreate(fireId: UUID, url: string): Observable<any> {
    return this.http
      .post(API.MEMES_CREATE, {
        fireId: fireId,
        url: url
      })
      .pipe();
  }

  public memeCreateCheck() {
    return this.http
      .get(API.MEMES_CREATE_CHECK, {})
      .pipe();
  }

  public memePage(page, size, sort): Observable<MemePage[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http
      .get<MemePage[]>(API.MEMES_READ, {headers, params})
      .pipe();
  }

  public memeUpload(image: File, path: string) {
    return this.storage.upload(path, image);
  }

  public memeLoad(path: string) {
    return this.storage.ref(path).getDownloadURL().pipe();
  }

  public memeRemove(path: string) {
    this.storage.ref(path).delete();
  }

}
