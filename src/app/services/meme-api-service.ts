import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs/Observable';
import {MemePage} from '../model/MemePage';
import 'rxjs/add/operator/map';
import {Meme} from '../model/Meme';

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

  public memePages(page, size, sort): Observable<MemePage[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http
      .get<MemePage[]>(API.MEMES_PAGES_READ, {headers, params})
      .pipe();
  }

  public memePage(memeId: UUID): Observable<Meme> {
    return this.http
      .get<Meme>(API.MEMES_READ + '/' + memeId)
      .pipe();
  }

  public memeUpload(image: File, path: string) {
    return this.storage.upload(path, image);
  }

  public memeLoad(path: string) {
    return this.storage.ref(path).getDownloadURL().pipe();
  }

  public memeDownload(url: string) {
    return this.http.get(url, {observe: 'response', responseType: 'blob'}).map((res) => {
      return new Blob([res.body], {type: res.headers.get('Content-Type')});
    });
  }
}
