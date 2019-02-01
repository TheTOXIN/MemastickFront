import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs/Observable';
import {HttpParamsOptions} from '@angular/common/http/src/params';
import {Meme} from '../model/Meme';


@Injectable()
export class MemeApiService {

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {

  }

  public memeCreate(fireId: UUID): Observable<any> {
    return this.http
      .post(API.MEMES_CREATE, {fireId: fireId})
      .pipe();
  }

  public memePage(page, size, sort): Observable<Meme[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http
      .get<Meme[]>(API.MEMES_READ, {headers, params})
      .pipe();
  }

  public memeUpload(image: File, fireId: UUID) {
    const path = `memes/${fireId}_${image.name}`;

    return this.storage.upload(path, image).then(() => {
      this.storage.ref(path).getDownloadURL().subscribe(
        url => {
          this.db.collection('memes').doc(fireId + '').set({
            uuid: fireId,
            url: url,
            date: new Date(),
          });
        },
      );
    });
  }

  public memeRemove(fireId: UUID) {
    this.db.collection('memes').doc(fireId + '').delete();
  }

  public memeRead(fireId: UUID) {
    return this.db.collection('memes').doc(fireId + '').ref.get();
  }

}
