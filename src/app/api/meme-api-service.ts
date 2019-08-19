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

  public memeCreate(fireId: UUID, url: string, text: string): Observable<any> {
    if (text === '') { text = null; }

    return this.http
      .post(API.MEMES_CREATE, {
        fireId: fireId,
        url: url,
        text: text
      })
      .pipe();
  }

  public memePage(memeId: UUID): Observable<MemePage> {
    return this.http
      .get<MemePage>(API.MEMES_PAGE + '/' + memeId)
      .pipe();
  }

  public memePages(filter, sort, page, size, step?, memetick?): Observable<MemePage[]> {
    if (step == null) { step = ''; }
    if (memetick == null) { memetick = ''; }

    const params = new HttpParams() // TODO TO IFACE
      .set('filter', filter)
      .set('page', page)
      .set('size', size)
      .set('sort', sort)
      .set('step', step)
      .set('memetick', memetick);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http
      .get<MemePage[]>(API.MEMES_PAGES, {headers, params})
      .pipe();
  }

  public memeRead(filter, sort, page, size, step?, memetick?): Observable<Meme[]> {
    if (step == null) { step = ''; }
    if (memetick == null) { memetick = ''; }

    const params = new HttpParams() // TODO TO IFACE
      .set('filter', filter)
      .set('page', page)
      .set('size', size)
      .set('sort', sort)
      .set('step', step)
      .set('memetick', memetick);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http
      .get<Meme[]>(API.MEMES_READ, {headers, params})
      .pipe();
  }

  public memeIMG(memeId: UUID): Observable<any> {
    return this.http
      .get(API.MEMES_IMG + '/' + memeId)
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

  public memeResurrect(memeId: UUID) {
    return this.http
      .patch(API.MEME_RESURRECT + '/' + memeId, {})
      .pipe();
  }
}
