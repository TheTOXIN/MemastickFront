import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from '@angular/fire/firestore';
import {tap, finalize} from 'rxjs/operators';

@Injectable()
export class MemFireService {

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {

  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    const path = `test/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    this.task = this.storage.upload(path, file, { customMetadata });

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.db.collection('photos').add({ path, size: snap.totalBytes });
        }
      }),
      finalize(() => {
        this.downloadURL = this.storage.ref(path).getDownloadURL();
      })
    );
  }

}
