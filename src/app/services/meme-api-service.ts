import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UUID} from 'angular2-uuid';
import {API} from '../consts/API';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs/Observable';


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
    console.log(this.db.collection('memes').doc(fireId + '').ref.path);
    this.db.collection('memes').doc(fireId + '').delete();
  }

  public memeRead(fireId: UUID) {
    console.log('READ - ' + fireId);

    this.db.collection('memes').doc(fireId + '').ref.get().then(function(doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data());
      } else {
        console.log('No such document!');
      }
    }).catch(function(error) {
      console.log('Error getting document:', error);
    });
  }

}
